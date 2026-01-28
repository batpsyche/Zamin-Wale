
const AdminLayout = ({ children }) => {
    return (
        <div className="flex w-full flex-1">
            <div className="flex h-full w-full flex-col overflow-y-auto">
                {children}
            </div>
        </div>
    )
}

export default AdminLayout
