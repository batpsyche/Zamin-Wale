import AuthProvider from "@/provider/authProvider"

const AuthenticateLayout = ({ children }) => {
    return (
        <>
            <AuthProvider>{children}</AuthProvider>
        </>
    )
}

export default AuthenticateLayout
