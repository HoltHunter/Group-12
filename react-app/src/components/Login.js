import React, { useState } from "react"
import * as Yup from "yup"
import { Navigate } from "react-router-dom"
import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    VStack,
    InputLeftElement,
    Box,
    FormControl,
    FormErrorMessage,
    InputRightElement,
} from "@chakra-ui/react"
import { useFormik } from "formik"

const baseUrl = "http://localhost:8081"

function Login({ setSession }) {
    const [shouldRedirect, setRedirect] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const handleShowClick = () => setShowPassword(!showPassword)
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Email required!"),
            password: Yup.string().required("Password required!"),
        }),
        onSubmit: (values, actions) => {
            const vals = { ...values }
            actions.resetForm()
            fetch(`${baseUrl}/auth/login`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(vals),
            })
                .catch((err) => {

                })
                .then((res) => {
                    if (!res || !res.ok || res.status >= 400) {
                        return
                    }
                    return res.json()
                })
                .then((data) => {
                    if (!data) return
                    if (data.loggedIn) {
                        setSession(data)
                        setRedirect(true)
                    }
                })
        },
    })

    return (
        <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            backgroundColor="gray.200"
            justifyContent="center"
            alignItems="center"
        >
            <VStack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
                onSubmit={formik.handleSubmit}
            >
                <Heading color="blue.400">
                    Group 12 Login
                </Heading>
                <Box minW={{ base: "90%", md: "500px" }}>
                    <form className="ui form">
                        <FormControl isInvalid={formik.errors.username && formik.touched.username}>
                            <InputGroup>
                                <InputLeftElement
                                    color="gray.300"
                                    pointerEvents="none"
                                />
                                <Input
                                    name="username"
                                    color="gray.300"
                                    type="email"
                                    placeholder="Email Address"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </InputGroup>
                            <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={formik.errors.password && formik.touched.password}>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    color="gray.300"
                                />
                                <Input
                                    name="password"
                                    color="gray"
                                    variant="outline"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <InputRightElement width="4.5rem" />
                                <button
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="tiny ui button"
                                >
                                    <i className="search icon" />
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </InputGroup>
                            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                        </FormControl>
                        <div className="content">
                            <button className="ui button primary right floated meta">
                                Login
                                {shouldRedirect && <Navigate replace to="/home" />}
                            </button>
                        </div>
                    </form>
                </Box>
            </VStack>
        </Flex>
    )
}

export default Login
