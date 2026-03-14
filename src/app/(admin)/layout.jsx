import AdminAuthGuard from "@/components/molecules/admin/AdminAuthGuard";

const AdminLayout = ({ children }) => {
    return <AdminAuthGuard>{children}</AdminAuthGuard>;
};

export default AdminLayout;
