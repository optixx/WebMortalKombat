app.core.Object.define("app.controller.Character", {
    extend: app.controller.Object,
    constructor: function (model, view) {
        arguments.callee.prototype.uper.apply(this, arguments); //call parent constructor
    },
    static: {},
    member: {
        _freezeTime: null,
        _timeout: null,

        dispatch: function (queue) {
            var model = this._model;
            var last  = queue && queue.length && queue[queue.length - 1];
            var code  = last && last[1]; 
            var time  = +new Date();

            if (this._freezeTime > time) {
                return;
            }

            switch (code) {
                case app.event.Object.LEFT:
                    model.setState('walk');
                    model.setDirection('left');
                    model.setX(model.getX() - 3);
                    break; 
                case app.event.Object.UP:
                    break; 
                case app.event.Object.RIGHT:
                    model.setState('walk');
                    model.setDirection('right');
                    model.setX(model.getX() + 3);
                    break; 
                case app.event.Object.DOWN:
                    break; 
                case app.event.Object.HIGH_PUNCH:
                case app.event.Object.LOW_PUNCH:
                    model.setState('punch');
                    this._freezeTime1000();
                    break; 
                case app.event.Object.HIGH_KICK:
                case app.event.Object.LOW_KICK:
                    model.setState('kick');
                    this._freezeTime1000();
                    break; 
                default:
                    model.setState('stance');
                    break;
            }
        },

        _freezeTime1000: function () {
            if (this._timeout) {
                clearTimeout(this._timeout);
            }

            this._freezeTime = +new Date() + 1000;
            this._timeout = setTimeout(this.dispatch.bind(this), 1010);
        }

        //idle: function () {},
        //victory: function () {},

        //moveForward: function () {},
        //moveBackward: function () {},

        //block: function () {},

        //highPunch: function () {},
        //lowPunch: function () {},
        //lowKick: function () {},
        //highKick: function () {},

        //jump: function () {},
        //jumpKick: function () {},
        //jumpPunch: function () {},

        //duck: function () {},
        //duckKick: function () {},
        //duckPunch: function () {},

        // down + hp
        //uppercut: function () {},
        //down + lp 
        //crouchPunch: function () {},
        // down + hk
        //crouchKick: function () {},
        // down + lk
        //ankleKick: function () {},
        // back + hk
        //roundhouse: function () {},
        // back + lk
        //sweep: function () {},

        // lp (close)
        //throwFlip: function () {},

        //turn: function () {}
    }
});

