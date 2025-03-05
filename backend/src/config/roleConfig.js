export const roles = {
    ADMIN:"admin",
    MANAGER:"manager",
    USER:"user"
}

export const rolePermissions={
    admin:['admin','manager','user'],
    manager:['manager','user'],
    user:['user']
}