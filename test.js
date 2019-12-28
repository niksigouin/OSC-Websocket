function shit(ip) {
    var n = ip.replace("::ffff:", "");
    return n;
};

var ip1 = "::ffff:192.166.22.32";
var ip2 = "127.0.0.1";

shit(ip2);