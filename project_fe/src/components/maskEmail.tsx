const maskEmail = (email: string): string => {
    const [username, domain] = email.split("@");
    const maskedUsername = username.slice(0, 4) + "****";
    return maskedUsername;
    // return maskedUsername + "@" + domain;
};

export default maskEmail;
