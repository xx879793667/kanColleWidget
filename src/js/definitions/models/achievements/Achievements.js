// module KanColleWidget
var KanColleWidget = KanColleWidget || {};

(function(){
    /**
     * @param storage
     * @constructor
     */
    var Achievements = KanColleWidget.Achievements = function(storage){
        this.storage = storage;
    }

    /**
     * @param force
     * @param target
     * @returns this
     */
    Achievements.prototype.update = function(force, target){
        if(typeof force == 'undefined') force = false;
        if(typeof target == 'undefined') target = 'all';
        var initial_achievements = {
            'daily' : {
                'lastUpdated' : this._getNearestDailyAchievementResetTime(),
                'contents' : {
                    mission_count   : 0,
                    practice_count  : 0,
                    map_count       : 0,
                    hokyu_count     : 0,
                    kaisou_count    : 0,
                    nyukyo_count    : 0,
                    createitem_count: 0,
                    destroyitem_count:0,
                    createship_count: 0
                }
            },
            'weekly' : {
                'lastUpdated' : this._getNearestWeeklyAchievementResetTime(),
                'contents' : {
                    mission_count   : 0,
                    practice_count  : 0,
                    map_count       : 0,
                    hokyu_count     : 0,
                    kaisou_count    : 0,
                    nyukyo_count    : 0,
                    createitem_count: 0,
                    destroyitem_count:0,
                    createship_count: 0
                }
            }
        };

        var achievements_json = this.storage.get('achievements') || initial_achievements;

        if(achievements_json.daily.lastUpdated < this._getNearestDailyAchievementResetTime()){
            achievements_json.daily.lastUpdated = Date.now();
            achievements_json.daily.contents = initial_achievements.daily.contents;
        }
        if(achievements_json.weekly.lastUpdated < this._getNearestWeeklyAchievementResetTime()){
            achievements_json.weekly.lastUpdated = Date.now();
            achievements_json.weekly.contents = initial_achievements.weekly.contents;
        }

        if(force == true){
            if(target == 'all'){
                achievements_json = initial_achievements;
            }else if(target == 'daily'){
                achievements_json.daily = initial_achievements.daily;
            }else if(target == 'weekly'){
                achievements_json.weekly = initial_achievements.weekly;
            }
        }
        this.storage.set('achievements', achievements_json);
        return this;
    }

    /**
     * @returns this
     */
    Achievements.prototype.incrementMissionCount = function(){
        return this._incrementByKey('mission_count');
    }

    /**
     * @returns this
     */
    Achievements.prototype.incrementPracticeCount = function(){
        return this._incrementByKey('practice_count');
    }

    /**
     * @returns this
     */
    Achievements.prototype.incrementMapCount = function(){
        return this._incrementByKey('map_count');
    }

    /**
     * @returns this
     */
    Achievements.prototype.incrementHokyuCount = function(){
        return this._incrementByKey('hokyu_count');
    }

    /**
     * @returns this
     */
    Achievements.prototype.incrementKaisouCount = function(){
        return this._incrementByKey('kaisou_count');
    }

    /**
     * @returns this
     */
    Achievements.prototype.incrementCreateshipCount = function(){
        return this._incrementByKey('createship_count');
    }

    /**
     * @returns this
     */
    Achievements.prototype.incrementCreateitemCount = function(){
        return this._incrementByKey('createitem_count');
    }
    /**
     * @returns this
     */
    Achievements.prototype.incrementDestroyitemCount = function(){
        return this._incrementByKey('destroyitem_count');
    }


    Achievements.prototype.incrementNyukyoCount = function(){
        return this._incrementByKey('nyukyo_count');
    };

    /**
     * @param key
     * @returns this
     * @private
     */
    Achievements.prototype._incrementByKey = function(key){

        if (! Config.get("record-achievements")) return this;

        var achievement_json = this.storage.get('achievements');
        var daily_count = achievement_json.daily.contents[key] || 0;
        achievement_json.daily.contents[key] = parseInt(daily_count) + 1;
        var weekly_count = achievement_json.weekly.contents[key] || 0;
        achievement_json.weekly.contents[key] = parseInt(weekly_count) + 1;
        this.storage.set('achievements',achievement_json);
        return this;
    }

    /**
     * @returns {*}
     */
    Achievements.prototype.toJson = function(){
        return this.storage.get('achievements');
    }

    /**
     * @returns {number}
     */
    Achievements.prototype._getNearestDailyAchievementResetTime = function(){
        return Util.getDailyResetTimestamp();
    }

    /**
     * @returns {number}
     */
    Achievements.prototype._getNearestWeeklyAchievementResetTime = function(){
        return Util.getWeeklyResetTimestamp();
    }
})();
