import React from "react"
import ReactDom from 'react-dom/client'
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import './index.css'
import { ChakraProvider } from "@chakra-ui/react"

const root = ReactDom.createRoot(document.getElementById('root'))

root.render(
  <BrowserRouter>
      <App />
  </BrowserRouter>
)