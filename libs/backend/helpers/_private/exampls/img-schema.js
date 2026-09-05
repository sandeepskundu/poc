// Resourcely

const configId = {
    // Images

    privacy:'private', // private|public|session

    urlsMapping:{
        // Sample complete Url : https://aiodeal.com/resourcely/privacy/tree/root/parent/child/grandChild/greatGrandChild/descendant/
        // Sample complete Url : https://aiodeal.com/resourcely/:privacy:/:tree:/:root:/:parent:/:child:/:grandChild:/:greatGrandChild:/:descendant:

        // /images/hotels/goa/taj-village-beach-resort/12345-room1.jpg.   ?cityId=cityId&hotelId=hotelId&rateId=rateId&imgId=imgId
    }
}

// https://www.google.com/imgres?q=Hotels%20in%20goa&imgurl=https%3A%2F%2Fr1imghtlak.mmtcdn.com%2Fce8d200e236d11e88b5b025f77df004f.jpg%3Foutput-quality%3D75%26downsize%3D328%3A180%26output-format%3Djpg&imgrefurl=https%3A%2F%2Fwww.makemytrip.com%2Fhotels%2Fgoa-hotels.html&docid=tTWkg06q00aNWM&tbnid=C4MDH0KwRC4PAM&vet=12ahUKEwiF9ZO9vqeOAxVUTWcHHXEPAbEQM3oECGwQAA..i&w=328&h=180&hcb=2&ved=2ahUKEwiF9ZO9vqeOAxVUTWcHHXEPAbEQM3oECGwQAA

const d = {
    "configId":"", // hash id of configuration that tell to cdn server request that what kind of configuration this file has. Like its common for all accorss and etc.

    "configs":{
        "privacy":'private',
        "root":"",
        "dirs":{
            d1:'',
            d2:'',
            d3:'',
            d4:'',
            d5:'',
            d6:'',
            d7:'',
            d8:'',
            d9:'',
            d10:''
        }
    },

    "file":{
        "name":"", //name of files
        "width": 400, // If images than 
        "height": 400, // If images than
        "aspectRatio": 1.0, // If images than
        "filesize": 102400,
        "extension": "jpg",
        "mimeType": "image/jpeg",
    },

    cleanup:{
        // Some cleanup configuration 
    },

    "attrs":{
        "alt":"",
        "title":"",
        "caption":""
    },

    "urls":{
        
    },

    "tags":["profile", "user", "avatar"],
    "status": "approved",  // options: pending, approved, rejected, flagged
  
    "url": "/uploads/user123_profile.jpg",
    "thumbnailUrl": "/uploads/thumbnails/user123_thumb.jpg",
    
    "orientation": "square",
    "dominantColor": "#cccccc",

    "isPublic": true,
    "isCompressed": true,
    "hasWatermark": false,

    "hash": "a1b2c3d4e5f67890123456789abcdef0",
    "virusScanned": true,

    "exifData": {
        "cameraModel": "iPhone 14 Pro",
        "iso": 100,
        "exposureTime": "1/60",
        "focalLength": "26mm",
        "gps": {
        "latitude": 28.6139,
        "longitude": 77.2090
        }
    },

    "aiMetadata": {
        "objectsDetected": ["person", "laptop"],
        "facesDetected": 1,
        "labels": ["portrait", "technology"],
        "textInImage": "Kundu Travel",
        "aiGenerated": false
    }
}