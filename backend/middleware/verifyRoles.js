
export default function verifyRoles(...allowRoles) {
    return (req, res, next) => {
        if (!req?.user || !req?.rol) return res.sendStatus(401);
        const { rol } = req;
        const result = allowRoles.some(r => r === rol)
        if (!result) {
            return res.status(401).json({error: 'Usuario no autorizado'});
        }
        next();
    }

}