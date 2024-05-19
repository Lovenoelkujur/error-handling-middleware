const express = require("express");

const PORT = 9000;

const app = express();

const userData = [];


// Middleware Function
function errHandleMiddleware(req, res, next){

    // Extract First Name and Last Name from request body
    const {firstName, lastName, email, password, phoneNumber} = req.body;

    // function to validate first letter is capital or not
    const isFirstLetterCapitalized = (name) => {
        return name && name[0] === name[0].toUpperCase();
    };

    // function to validate Email
    const isValidEmail = (email) => {
        return email && email.includes("@");
    };

    // function to validate Password
    const isValidPassword = (password) => {
        const hasSpecialCharacter = /[!@#$%&*~=+-/]/.test(password);
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumeric = /\d/.test(password);
        const isLongEnough = password && password.length >= 8;
        return hasSpecialCharacter && hasUpperCase && hasNumeric && isLongEnough;
    };

    // function to validate Phone number length
    const isValidPhoneNumber = (phoneNumber) => {
        const maxLength = phoneNumber && phoneNumber.length >= 10;
        const minLength = phoneNumber && phoneNumber.length <= 15;
        return maxLength && minLength
    };


    // Check first name & last name enter or not
    if (!firstName || !lastName) {
        return res.status(400).json({
            success : false,
             error : "Both first name and last name are required." 
        });
    }

    // Condition check
    if (!isFirstLetterCapitalized(firstName) || !isFirstLetterCapitalized(lastName)) {
        return res.status(400).json({
            success : false,
            error : "The first letter of both the first name and last name must be capitalized." 
        });
    }

    // Validate email
    if (!isValidEmail(email)) {
        return res.status(400).json({
            success : false,
            error : "A valid email address is required."
        });
    }

    // Validate password
    if (!isValidPassword(password)) {
        return res.status(400).json({ 
            success : false,
            error : "Password must contain at least one special character, one uppercase letter, one numeric character, and be at least 8 characters long." 
        });
    }

    // Validate phone number
    if (!isValidPhoneNumber(phoneNumber)) {
        return res.status(400).json({ 
            success : false,
            error : "Phone number must have at least 10 digits." 
        });
    }
    
    next();
}

// Middleware to parse JSON bodies
app.use(express.json());

// Sign-up (Post Method)
app.post("/signup", errHandleMiddleware, (req, res) => {
    userData.push = req.body;
    console.log("Sign up Sucessfully at " + new Date() );
    res.status(201).json({
        success : true,
        message : "Registration done sucessfully"
    })
})

// Sign-in (Get Method)
app.get("/signin", (req, res) => {
    res.status(200).json({
        success : true,
        message : "User sign in Sucessfully",
    })
})

// Handle unknown request (Use Method)
app.use("/*", (res, req) => {
    res.status(404).json({
        success : true,
        error : "Unknown path"
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})

