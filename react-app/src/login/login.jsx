import { useState } from "react";
import * as Yup from "yup";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  VStack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  FormControl,
  FormErrorMessage,
  InputRightElement,
  Checkbox
} from "@chakra-ui/react";
import { FaUserAlt, FaEnvelope, FaLock } from "react-icons/fa";
import { useFormik } from "formik";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const CFaEmail = chakra(FaEnvelope);



const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: Yup.object({
      username: Yup.string().required("Email required!"),
      password: Yup.string().required("Password required!"),
    }),
    onSubmit: (values, actions) => {
      const vals = { ...values };
      actions.resetForm();
      fetch("http://localhost:5000/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vals),
      })
        .catch(err => {
          return;
        })
        .then(res => {
          if (!res || !res.ok || res.status >= 400) {
            return;
          }
          return res.json();
        })
        .then(data => {
          if (!data) return;
          console.log(data);
        });
    }}
  )

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
        <Heading color="blue.400">Group 12 Login</Heading>
        <Box minW={{ base: "90%", md: "500px" }}>
          <form>
            <VStack
              spacing={4}
              p="1rem"
              m="auto"
              backgroundColor="blackAlpha.900"
              boxShadow="lg"
            >
              <FormControl isInvalid={formik.errors.username && formik.touched.username}>
                <InputGroup>
                  <InputLeftElement
                    color="gray.300"
                    pointerEvents="none"
                    children={<CFaEmail color="gray.300" />}
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
                    children={<CFaLock color="gray.300" />}
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
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              <FormControl>
                  <Checkbox p="rem">Remember me.</Checkbox>          
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="blue"
                width="full"
              >
                Login
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
      <Box color="blackAlpha.900">
        New here?{" "}
        <Link color="blue.500" href="#">
          Sign Up
        </Link>
      </Box>
    </Flex>
  );

};

export default Login;