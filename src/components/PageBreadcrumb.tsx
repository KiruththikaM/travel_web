import { Breadcrumbs, Link, Typography } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { useNavigate } from 'react-router-dom'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageBreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

function PageBreadcrumb({ items, className }: PageBreadcrumbProps) {
  const navigate = useNavigate()

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon sx={{ fontSize: 16 }} />}
      className={className}
      sx={{ fontSize: 13, fontWeight: 500 }}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        if (isLast || !item.href) {
          return (
            <Typography key={i} sx={{ fontSize: 13, fontWeight: 600, color: 'text.primary' }}>
              {item.label}
            </Typography>
          )
        }
        return (
          <Link
            key={i}
            underline="hover"
            sx={{ fontSize: 13, fontWeight: 500, cursor: 'pointer', color: 'text.secondary' }}
            onClick={() => navigate(item.href!)}
          >
            {item.label}
          </Link>
        )
      })}
    </Breadcrumbs>
  )
}

export default PageBreadcrumb
