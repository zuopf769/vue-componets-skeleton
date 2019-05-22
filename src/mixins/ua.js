export default {
    data () {
        return {
            isMobile: /(iPhone|iPad|iPod|iOS|Android|SymbianOS|Windows Phone|Mobile)/i.test(navigator.userAgent)
        };
    }
};
