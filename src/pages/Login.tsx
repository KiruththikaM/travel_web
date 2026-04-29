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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    setError("");
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (isLogin) {
      const user = users.find((u: User) => u.email === email && u.password === password)
      if (user) {
        dispatch(login(user));
        window.dispatchEvent(new CustomEvent("showToast", { detail: { message: "Login successful!", severity: "success" } }));
        handleClose();
      } else {
        setError("Invalid email or password. Please register if you don't have an account.");
      }
    } else {
      if (!name || !email || !password) {
        setError("All fields are required.");
        return;
      }
      const userExists = users.some((u: User) => u.email === email)
      if (userExists) {
        setError("User already exists with this email. Please login.");
      } else {
        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));
        
        emailjs.send(
          "service_zlxwif9",
          "template_xl9ewvo",
          {
            title: "Welcome Request",
            user_name: name,
            user_email: email,
            name: "VisitSriLanka System",
            email: email
          },
          "UZdscZBUE52_q_Tjs"
        ).then(() => {
          console.log("Welcome email sent successfully");
        }).catch((err) => {
          console.error("Failed to send welcome email:", err);
        });

        window.dispatchEvent(new CustomEvent("showToast", { detail: { message: "Registration successful! A welcome email has been sent.", severity: "success" } }));
        setIsLogin(true);
      }
    }
  };

  const handleResetAndClose = () => {
    setIsLogin(true);
    setEmail("");
    setPassword("");
    setName("");
    setError("");
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
        <Stack spacing={2.5} sx={{ mt: 1 }}>
          {error && (
            <Typography variant="body2" sx={{ bgcolor: '#fef2f2', color: '#ef4444', p: 1.5, borderRadius: 2, textAlign: 'center', fontWeight: 500 }}>
              {error}
            </Typography>
          )}
          {!isLogin && (
            <TextField 
              label="Full Name" 
              fullWidth 
              variant="outlined"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          )}
          <TextField 
            label="Email Address" 
            type="email" 
            fullWidth 
            variant="outlined"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <TextField 
            label="Password" 
            type="password" 
            fullWidth 
            variant="outlined"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />

          <Button 
            variant="contained" 
            onClick={handleSubmit}
            size="large"
            disableElevation
            pill
            sx={{ 
              mt: 2, 
              py: 1.5,
              fontSize: '1rem',
              transition: 'all 0.2s'
            }}
          >
            {isLogin ? "Sign In" : "Create Account"}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 1, pb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <Button 
                variant="text" 
                onClick={() => { setIsLogin(!isLogin); setError(""); }}
                disableRipple
                sx={{ 
                  p: 0,
                  minWidth: 'auto',
                  '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
                }}
              >
                {isLogin ? "Sign up" : "Log in"}
              </Button>
            </Typography>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default Login;
