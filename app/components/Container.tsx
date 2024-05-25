import { ReactNode } from "react";

const Container = ({ children } : { children: ReactNode }) => 
  <div className="w-screen md:w-8/12 m-auto">{children}</div>

export { Container }
