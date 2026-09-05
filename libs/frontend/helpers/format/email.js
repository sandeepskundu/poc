const mask = (email, visible = 3) => {
    let [user, domain] = email.split("@");

    if(!domain){
        return email;
    }

    let maskedUser = user.slice(0, visible) + "*".repeat(Math.max(user.length - visible, 3));

    return `${maskedUser}@${domain}`;
};

exports.mask = mask;