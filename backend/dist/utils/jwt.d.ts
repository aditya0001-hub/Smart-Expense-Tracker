interface JwtPayload {
    id: number;
    email: string;
}
export declare function generateToken(payload: JwtPayload): string;
export declare function verifyToken(token: string): JwtPayload;
export {};
//# sourceMappingURL=jwt.d.ts.map