var QBApp = {
    appId: 44585,
    authKey: 'KdeFGvqMuzD9Ndd',
    authSecret: 'h4yug6kBmUVfqHw'
};

var AnnouncementsText = null;

var config = {
    chatProtocol: {
        active: 2
    },
    streamManagement: {
        enable: true
    },
    debug: {
        mode: 1,
        file: null
    },
    stickerpipe: {
        elId: 'stickers_btn',
        apiKey: '847b82c49db21ecec88c510e377b452c',
        enableEmojiTab: false,
        enableHistoryTab: true,
        enableStoreTab: true,

        userId: null,

        priceB: '0.99 $',
        priceC: '1.99 $'
    }
};

/*var QBUser1 = {
        id: 23246328,
        name: 'Sachin',
        login: 'sachin@swayaminfotech.com',
        pass: '12345678'
    },
    QBUser2 = {
        id: 23484901,
        name: 'Jitesh',
        login: 'jitesh.vadodariya@swayaminfotech.com',
        pass: '12345678'
    };*/

QB.init(QBApp.appId, QBApp.authKey, QBApp.authSecret, config);

$('.j-version').text('v.' + QB.version + '.' + QB.buildNumber);
