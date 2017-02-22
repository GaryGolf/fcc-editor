"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var React = require("react");
var update = require("react/lib/update");
var DragDropContext = require('react-dnd').DragDropContext;
var HTML5Backend = require('react-dnd-html5-backend');
var Card_1 = require("./Card");
var style = {
    width: 400,
};
var Container = (function (_super) {
    __extends(Container, _super);
    function Container(props) {
        var _this = _super.call(this, props) || this;
        _this.moveCard = _this.moveCard.bind(_this);
        _this.state = {
            cards: [{
                    id: 1,
                    text: 'Write a cool JS library',
                }, {
                    id: 2,
                    text: 'Make it generic enough',
                }, {
                    id: 3,
                    text: 'Write README',
                }, {
                    id: 4,
                    text: 'Create some examples',
                }, {
                    id: 5,
                    text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
                }, {
                    id: 6,
                    text: '???',
                }, {
                    id: 7,
                    text: 'PROFIT',
                }],
        };
        return _this;
    }
    Container.prototype.moveCard = function (dragIndex, hoverIndex) {
        var cards = this.state.cards;
        var dragCard = cards[dragIndex];
        this.setState(update(this.state, {
            cards: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            },
        }));
    };
    Container.prototype.render = function () {
        var _this = this;
        var cards = this.state.cards;
        return (React.createElement("div", { style: style }, cards.map(function (card, i) { return (React.createElement(Card_1.default, { key: card.id, index: i, id: card.id, text: card.text, moveCard: _this.moveCard })); })));
    };
    return Container;
}(React.Component));
Container = __decorate([
    DragDropContext(HTML5Backend),
    __metadata("design:paramtypes", [Object])
], Container);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Container;
//# sourceMappingURL=Container.js.map