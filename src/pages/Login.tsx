import { useState, forwardRef } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
import type { User } from "../types";
import emailjs from '@emailjs/browser';
import { Dialog, DialogTitle, DialogContent, TextField, Stack, Typography, Box, Slide, IconButton } from "@mui/material";
import Button from "../components/Button";
import type { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import ExploreIcon from '@mui/icons-material/Explore';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function Login({ open, handleClose }: { open: boolean, handleClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [serverError, setServerError] = useState("");
  const dispatch = useDispatch();

  const loginSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Email is required."),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters.")
      .max(8, "Password must not exceed 8 characters.")
      .required("Password is required."),
  });

  const registerSchema = Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, "Name must contain only letters.")
      .test("not-spaces-only", "Name must contain at least one letter.", (val) => !!val && /[a-zA-Z]/.test(val))
      .max(50, "Name must not exceed 50 characters.")
      .required("Full name is required."),
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("Email is required."),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters.")
      .max(8, "Password must not exceed 8 characters.")
      .required("Password is required."),
  });

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: isLogin ? loginSchema : registerSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      setServerError("");
      import('../data/db.json').then((db) => {
        const adminCreds = db.adminCredentials;
        if (values.email === adminCreds.email && values.password === adminCreds.password) {
          dispatch(login({ name: adminCreds.name, email: adminCreds.email, role: 'admin' }));
          window.dispatchEvent(new CustomEvent("showToast", { detail: { message: "Welcome, Admin!", severity: "success" } }));
          handleResetAndClose();
          return;
        }

        const users = JSON.parse(localStorage.getItem("users") || "[]");
        if (isLogin) {
          const user = users.find((u: User) => u.email === values.email && u.password === values.password);
          if (user) {
            dispatch(login({ ...user, role: 'user' }));
            window.dispatchEvent(new CustomEvent("showToast", { detail: { message: "Login successful!", severity: "success" } }));
            handleResetAndClose();
          } else {
            setServerError("Invalid email or password. Please register if you don't have an account.");
          }
        } else {
          const userExists = users.some((u: User) => u.email === values.email);
          if (userExists) {
            setServerError("User already exists with this email. Please login.");
          } else {
            users.push({ name: values.name, email: values.email, password: values.password, role: 'user' });
            localStorage.setItem("users", JSON.stringify(users));
            emailjs.send("service_zlxwif9", "template_xl9ewvo", { title: "Welcome Request", user_name: values.name, user_email: values.email, name: "VisitSriLanka System", email: values.email }, "UZdscZBUE52_q_Tjs")
              .then(() => console.log("Welcome email sent"))
              .catch((err) => console.error("Failed to send welcome email:", err));
            window.dispatchEvent(new CustomEvent("showToast", { detail: { message: "Registration successful! A welcome email has been sent.", severity: "success" } }));
            switchMode(true);
          }
        }
      });
    },
  });

  const switchMode = (toLogin: boolean) => {
    setIsLogin(toLogin);
    setServerError("");
    formik.resetForm();
  };

  const handleResetAndClose = () => {
    setServerError("");
    formik.resetForm();
    setIsLogin(true);
    handleClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleResetAndClose} 
      maxWidth="xs" 
      fullWidth
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          borderRadius: 4,
          padding: 1,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 1, pr: 1 }}>
        <IconButton onClick={handleResetAndClose} size="small" sx={{ color: 'text.secondary' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogTitle sx={{ textAlign: 'center', pb: 1, pt: 0 }}>
        <ExploreIcon sx={{ color: '#fb5b52', fontSize: 48, mb: 1 }} />
        <Typography variant="h5" fontWeight="800" color="#111827">
          {isLogin ? "Welcome Back" : "Join VisitSriLanka"}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {isLogin ? "Enter your credentials to continue." : "Create an account to start planning your perfect trip."}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Stack spacing={2.5} sx={{ mt: 1 }}>
            {serverError && (
              <Typography variant="body2" sx={{ bgcolor: '#fef2f2', color: '#ef4444', p: 1.5, borderRadius: 2, textAlign: 'center', fontWeight: 500 }}>
                {serverError}
              </Typography>
            )}
            {!isLogin && (
              <TextField
                label="Full Name"
                fullWidth
                variant="outlined"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && !!formik.errors.name}
                helperText={formik.touched.name && formik.errors.name}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            )}
            <TextField
              label="Email Address"
              fullWidth
              variant="outlined"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && !!formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disableElevation
              pill
              sx={{ mt: 2, py: 1.5, fontSize: '1rem', transition: 'all 0.2s' }}
            >
              {isLogin ? "Sign In" : "Create Account"}
            </Button>

            <Box sx={{ textAlign: 'center', mt: 1, pb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <Button
                  variant="text"
                  onClick={() => switchMode(!isLogin)}
                  disableRipple
                  sx={{ p: 0, minWidth: 'auto', '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}
                >
                  {isLogin ? "Sign up" : "Log in"}
                </Button>
              </Typography>
            </Box>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default Login;
