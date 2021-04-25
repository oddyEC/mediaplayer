import Ads from "./Ads";
var AdsPlugin = /** @class */ (function () {
    function AdsPlugin() {
        this.ads = Ads.getInstance();
        this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
        this.adsContainer = document.createElement("div");
    }
    AdsPlugin.prototype.run = function (player) {
        this.player = player;
        this.player.container.appendChild(this.adsContainer);
        this.media = this.player.media;
        this.media.addEventListener("timeupdate", this.handleTimeUpdate);
    };
    AdsPlugin.prototype.handleTimeUpdate = function () {
        var currentTime = Math.floor(this.media.currentTime);
        if (currentTime % 30 === 0) {
            this.renderAd();
        }
    };
    AdsPlugin.prototype.renderAd = function () {
        var _this = this;
        if (this.currentAd) {
            return;
        }
        var ad = this.ads.getAd();
        this.currentAd = ad;
        this.adsContainer.innerHTML = " <div class=\"ads\">\n    <a  class=\"ads__link\" href=\"" + this.currentAd.url + "\" target=\"_blank\">\n      <img class=\"ads__img\" src=\"" + this.currentAd.imageUrl + "\" />\n      <div class=\"ads__info\">\n        <h5 class=\"ads__title\">" + this.currentAd.title + "</h5>\n        <p class=\"ads__body\">" + this.currentAd.body + "</p>\n      </div>\n    </a>\n  </div>";
        setTimeout(function () {
            _this.currentAd = null;
            _this.adsContainer.innerHTML = '';
        }, 10000);
    };
    return AdsPlugin;
}());
export default AdsPlugin;
