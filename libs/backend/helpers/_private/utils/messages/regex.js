module.exports = {
    mobile:{
        dom:"",
        int:""
    },
    empId:'',
    numberOnly:'',
    username:'',
    email:'Please enter a valid email id',
    otp:'Please enter a 6-digit numeric code.',
    password:'Password must be 8-16 characters long with at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*()).',
    token:"The provided value doesn't seem to be valid. Please verify and try again.",
    md5Hash:"The provided value doesn't seem to be valid. Please verify and try again.",
    mongoId:"The provided value doesn't seem to be valid. Please verify and try again.",
    stringmap:"Only letters, numbers, and dots are allowed — dot cannot appear at the start, end, or consecutively.",
    alphabets:{
        key:'The key must contain only alphabetic characters without any spaces or special characters.'
    },
    name:{
        fn:"Only letters, apostrophes (') and hyphens (-) allowed. Length must be between 2 and 30 characters. No spaces or numbers.",
        mn:"Only letters, apostrophes (') and hyphens (-) allowed. Length must be between 2 and 30 characters. No spaces or numbers.",
        ln:"Only letters, apostrophes (') and hyphens (-) allowed. Length must be between 2 and 30 characters. No spaces or numbers.",
        fmn:"Only letters, apostrophes (') and hyphens (-) allowed. Each name must be at least 2 characters. No numbers, symbols, or extra spaces."
    },
    address:{
        line1:"Only alphanumeric characters and , . - / # allowed. Max 100 characters.",
        line2:"Only alphanumeric characters and , . - / # ( ) allowed. Max 100 characters.",
        landmark:"Landmark must be 3-100 characters and contain only letters, numbers, spaces, and basic punctuation (, . - / # ( )).",
        pincode:"Pincode must be a 6-digit number starting with 1-9."
    },
    country:{
        name:"Only alphabets are allowed with a single space between words."
    },
    string:{
        encoded:"The provided value doesn't seem to be valid. Please verify and try again."
    },
    text:{
        code:"Value must contain only capital letters (A-Z) and single hyphens, without leading or trailing hyphens or space.",
        lowerCode:"Value must contain only small letters (a-z) and single hyphens, without leading or trailing hyphens or space.",
        paragraph:'Your text contains invalid formatting. Use only letters, numbers, punctuation, or underscores and avoid extra blank lines.',
        paragraphs:'Your text contains invalid formatting. Use only letters, numbers, punctuation, or underscores and avoid extra blank lines.',
        richtext:"Your text contains invalid formatting. Use only letters, numbers, punctuation, underscores, or HTML tags, and avoid extra blank lines."
    },
    hashmap:{
        optional:"Only letters, numbers, and dots are allowed — dot cannot appear at the start, end, or consecutively.",
        required:"Value must be 32 alphanumeric chars, optionally followed by . + 32 more."
    },
    idmap:{
        optional:"Only letters, numbers, and dots are allowed — dot cannot appear at the start, end, or consecutively.",
        required:"Value must be 24 alphanumeric chars, optionally followed by . + 24 more."
    },
    date:{
        format:{
            YYYY_MM_DD:'Please enter the date in YYYY-MM-DD format (e.g., 2025-12-20).'
        }
    },
    number:{
        only:'Only number values are allowed'
    }
}