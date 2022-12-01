import React from "react"
import axios from "axios"

export default function Session() {
  	axios.get("/auth/login")
        .then((response) => {
            console.log(response.data)
            return response.data
        })
        .catch(() => {
            alert("User list NOT found")
        })
}
