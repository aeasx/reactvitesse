import App from "@/App"
import { About, AuthLayout, Login, Home, Register } from "@/pages"
import { Button, Result } from "antd"
import type { RouteObject } from "react-router"

export const routes: RouteObject[] = [
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
    ],
  },
  // Auth作为独立页面，而不是布局
  {
    path: 'auth',
    children: [
      { index: true, Component: AuthLayout },
      { path: 'login', Component: Login },
      { path: 'register', Component: Register }
    ]
  },
  {
    path: '*',
    element: <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary">Back Home</Button>}
    />
  }
]
