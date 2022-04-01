var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
define("ts-firebase-rules-final_/otherRequiredFiles/tsfrTypes/index", ["require", "exports", "./firescript_types", "./fs1", "./fsNativeFunctions", "./tsTypeHelpers"], function (require, exports, firescript_types_1, fs1_1, fsNativeFunctions_1, tsTypeHelpers_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(firescript_types_1, exports);
    __exportStar(fs1_1, exports);
    __exportStar(fsNativeFunctions_1, exports);
    __exportStar(tsTypeHelpers_1, exports);
});
define("ts-firebase-rules-final_/otherRequiredFiles/helpers/fns", ["require", "exports", "ts-firebase-rules-final_/otherRequiredFiles/tsfrTypes/index"], function (require, exports, tsfrTypes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSharedItems = exports.getDiffItems = exports.toObj = exports.include = exports.fieldsEqualTo = exports.allowToUpdate = exports.strBetween = exports.numBetween = exports.getDataAfter = exports.getData = exports.getReq = exports.getCurrentValues = exports.str = void 0;
    function str(textValue) {
        return textValue;
    }
    exports.str = str;
    function getCurrentValues() {
        const reqData = tsfrTypes_1.resource.data;
        return reqData;
    }
    exports.getCurrentValues = getCurrentValues;
    function getReq() {
        const reqData = tsfrTypes_1.request.resource.data;
        return reqData;
    }
    exports.getReq = getReq;
    function getData(tbl, id) {
        const reqData = tsfrTypes_1.getData_(tbl, id);
        return reqData;
    }
    exports.getData = getData;
    function getDataAfter(tbl, id) {
        const reqData = tsfrTypes_1.getDataAfter_(tbl, id);
        return reqData;
    }
    exports.getDataAfter = getDataAfter;
    function numBetween(field, start, end) {
        return (tsfrTypes_1.request.resource.data[field] >= start && tsfrTypes_1.request.resource.data[field] <= end);
    }
    exports.numBetween = numBetween;
    function strBetween(field, start, end) {
        return (tsfrTypes_1.request.resource.data[field].size() >= start && tsfrTypes_1.request.resource.data[field].size() <= end);
    }
    exports.strBetween = strBetween;
    function allowToUpdate(allowToUpdatefieldsArr) {
        return (tsfrTypes_1.request.resource.data.diff(tsfrTypes_1.resource.data).affectedKeys()
            .hasOnly(allowToUpdatefieldsArr));
    }
    exports.allowToUpdate = allowToUpdate;
    function fieldsEqualTo(fieldsArr) {
        return (tsfrTypes_1.request.resource.data.keys().toSet() === fieldsArr.toSet());
    }
    exports.fieldsEqualTo = fieldsEqualTo;
    function include(item, targetArr) {
        return (item in targetArr.toSet());
    }
    exports.include = include;
    function toObj(targetArr) {
        return targetArr.toSet();
    }
    exports.toObj = toObj;
    function getDiffItems(objA, objB) {
        return objA.difference(objB.toSet());
    }
    exports.getDiffItems = getDiffItems;
    function getSharedItems(objA, objB) {
        return objA.intersection(objB.toSet());
    }
    exports.getSharedItems = getSharedItems;
});
define("ts-firebase-rules-final_/otherRequiredFiles/helpers/index", ["require", "exports", "ts-firebase-rules-final_/otherRequiredFiles/helpers/fns"], function (require, exports, fns_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(fns_1, exports);
});
define("smartNet/tsfr/functions/otherFns/index", ["require", "exports", "ts-firebase-rules-final_/index"], function (require, exports, ts_firebase_rules_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.loggedIn = void 0;
    function loggedIn() {
        return (ts_firebase_rules_1.request.auth.token.email.matches('[A-Za-z][A-Za-z0-9].*@tmp[.]tmp') &&
            ts_firebase_rules_1.request.auth.token.email.size() >= 6 && ts_firebase_rules_1.request.auth.token.email.size() <= 28 &&
            ts_firebase_rules_1.request.auth != null);
    }
    exports.loggedIn = loggedIn;
});
define("smartNet/tsfr/functions/_globalVariables_", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports._globalVariables_ = void 0;
    var _globalVariables_;
    (function (_globalVariables_) {
        _globalVariables_.minimumCharsInTitle = 6;
        _globalVariables_.maximumCharsInTitle = 20;
        _globalVariables_.asdasd = _globalVariables_.minimumCharsInTitle + _globalVariables_.minimumCharsInTitle;
        _globalVariables_.$_maxSalePrice = 100000000000;
        _globalVariables_.$_minSalePrice = 0;
        _globalVariables_.$_minAllowedUsers = 1;
        _globalVariables_.$_maxAllowedUsers = 500;
        _globalVariables_.$_minAllowedDirects = 0;
        _globalVariables_.$_maxAllowedDirects = 500;
        _globalVariables_.$_maxAllowedProducts = 1000;
        _globalVariables_.$_min_groupPercentageCalculationConfigs = 0;
        _globalVariables_.$_max_groupPercentageCalculationConfigs = 40;
    })(_globalVariables_ = exports._globalVariables_ || (exports._globalVariables_ = {}));
});
define("smartNet/tsfr/functions/groups/create_groups", ["require", "exports", "smartNet/tsfr/functions/groups/index", "ts-firebase-rules-final_/index", "smartNet/tsfr/functions/otherFns/index", "smartNet/tsfr/functions/_globalVariables_"], function (require, exports, _1, ts_firebase_rules_2, otherFns_1, _globalVariables_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create_groups2 = exports.create_groups = void 0;
    function create_groups(id) {
        const reqData = ts_firebase_rules_2.getReq();
        return (ts_firebase_rules_2.docExists(ts_firebase_rules_2.request.auth.uid, 'users_public') &&
            ts_firebase_rules_2.docExists(ts_firebase_rules_2.request.auth.uid, 'users_private') &&
            !ts_firebase_rules_2.docExists(ts_firebase_rules_2.request.auth.uid, 'groups') &&
            otherFns_1.loggedIn() &&
            ts_firebase_rules_2.request.auth.uid === id &&
            ts_firebase_rules_2.fieldsEqualTo([
                'groupName',
                'groupComment',
                'adminEmail',
                'adminNumber',
                'groupPercentageCalculationConfigs',
                'active',
                'maxSalePrice',
                'minSalePrice',
                'products',
                'maximumUsers',
                'maximumDirects',
                'saleType',
                'groupSalesType'
            ]) &&
            ts_firebase_rules_2.isString(reqData.groupName) && ts_firebase_rules_2.strBetween('groupName', 6, 20) &&
            reqData.groupName.matches('[A-Za-z][A-Za-z0-9].*') &&
            ts_firebase_rules_2.isString(reqData.groupComment) && ts_firebase_rules_2.strBetween('groupComment', 0, 30) &&
            reqData.adminEmail === ts_firebase_rules_2.request.auth.token.email &&
            ts_firebase_rules_2.isString(reqData.adminNumber) && ts_firebase_rules_2.strBetween('adminNumber', 0, 30) &&
            _1.validateGroupPercentageCalculationConfigs(reqData.groupPercentageCalculationConfigs, reqData.minSalePrice) &&
            ts_firebase_rules_2.isBool(reqData.active) &&
            ts_firebase_rules_2.isInt(reqData.maxSalePrice) && reqData.maxSalePrice <= _globalVariables_1._globalVariables_.$_maxSalePrice && reqData.maxSalePrice > reqData.minSalePrice &&
            ts_firebase_rules_2.isInt(reqData.minSalePrice) && reqData.minSalePrice >= _globalVariables_1._globalVariables_.$_minSalePrice && reqData.minSalePrice < reqData.maxSalePrice &&
            reqData.products.size() <= _globalVariables_1._globalVariables_.$_maxAllowedProducts &&
            ts_firebase_rules_2.isInt(reqData.maximumUsers) && reqData.maximumUsers >= _globalVariables_1._globalVariables_.$_minAllowedUsers && reqData.maximumUsers <= _globalVariables_1._globalVariables_.$_maxAllowedUsers &&
            ts_firebase_rules_2.isInt(reqData.maximumDirects) && reqData.maximumDirects >= _globalVariables_1._globalVariables_.$_minAllowedDirects && reqData.maximumDirects <= _globalVariables_1._globalVariables_.$_maxAllowedDirects && reqData.maximumDirects < reqData.maximumUsers &&
            create_groups2());
    }
    exports.create_groups = create_groups;
    function create_groups2() {
        const users_public = ts_firebase_rules_2.getData('users_public', ts_firebase_rules_2.request.auth.uid);
        return (users_public.role === ts_firebase_rules_2.str('admin'));
    }
    exports.create_groups2 = create_groups2;
});
define("smartNet/tsfr/functions/groups/read_groups", ["require", "exports", "ts-firebase-rules-final_/index", "smartNet/tsfr/functions/otherFns/index"], function (require, exports, ts_firebase_rules_3, otherFns_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.read_groups2 = exports.read_groups = void 0;
    function read_groups(id) {
        return (ts_firebase_rules_3.docExists(ts_firebase_rules_3.request.auth.uid, 'users_public') &&
            ts_firebase_rules_3.docExists(ts_firebase_rules_3.request.auth.uid, 'users_private') &&
            ts_firebase_rules_3.docExists(id, 'groups') &&
            otherFns_2.loggedIn() &&
            read_groups2(id));
    }
    exports.read_groups = read_groups;
    function read_groups2(id) {
        const users_public = ts_firebase_rules_3.getData('users_public', ts_firebase_rules_3.request.auth.uid);
        const users_private = ts_firebase_rules_3.getData('users_private', ts_firebase_rules_3.request.auth.uid);
        return (users_private.status === ts_firebase_rules_3.str('confirmed') &&
            users_public.path[0] === id);
    }
    exports.read_groups2 = read_groups2;
});
define("smartNet/tsfr/functions/groups/update_groups", ["require", "exports", "smartNet/tsfr/functions/_globalVariables_", "ts-firebase-rules-final_/index", "smartNet/tsfr/functions/otherFns/index"], function (require, exports, _globalVariables_2, ts_firebase_rules_4, otherFns_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.gpccA = exports.validateGroupPercentageCalculationConfigs = exports.update_groups2 = exports.update_groups = void 0;
    function update_groups(id) {
        const reqData = ts_firebase_rules_4.getReq();
        return (ts_firebase_rules_4.docExists(ts_firebase_rules_4.request.auth.uid, 'users_public') &&
            ts_firebase_rules_4.docExists(ts_firebase_rules_4.request.auth.uid, 'users_private') &&
            ts_firebase_rules_4.docExists(ts_firebase_rules_4.request.auth.uid, 'groups') &&
            otherFns_3.loggedIn() &&
            ts_firebase_rules_4.request.auth.uid === id &&
            ts_firebase_rules_4.allowToUpdate([
                'groupComment',
                'groupPercentageCalculationConfigs',
                'active',
                'maxSalePrice',
                'minSalePrice',
                'products',
                'maximumUsers',
                'maximumDirects'
            ]) &&
            ts_firebase_rules_4.isString(reqData.groupComment) && ts_firebase_rules_4.strBetween('groupComment', 0, 30) &&
            validateGroupPercentageCalculationConfigs(reqData.groupPercentageCalculationConfigs, reqData.minSalePrice) &&
            ts_firebase_rules_4.isBool(reqData.active) &&
            ts_firebase_rules_4.isInt(reqData.maxSalePrice) && reqData.maxSalePrice <= _globalVariables_2._globalVariables_.$_maxSalePrice && reqData.maxSalePrice > reqData.minSalePrice &&
            ts_firebase_rules_4.isInt(reqData.minSalePrice) && reqData.minSalePrice >= _globalVariables_2._globalVariables_.$_minSalePrice && reqData.minSalePrice < reqData.maxSalePrice &&
            reqData.products.size() <= _globalVariables_2._globalVariables_.$_maxAllowedProducts &&
            ts_firebase_rules_4.isInt(reqData.maximumUsers) && reqData.maximumUsers >= _globalVariables_2._globalVariables_.$_minAllowedUsers && reqData.maximumUsers <= _globalVariables_2._globalVariables_.$_maxAllowedUsers &&
            ts_firebase_rules_4.isInt(reqData.maximumDirects) && reqData.maximumDirects >= _globalVariables_2._globalVariables_.$_minAllowedDirects && reqData.maximumDirects <= _globalVariables_2._globalVariables_.$_maxAllowedDirects && reqData.maximumDirects < reqData.maximumUsers &&
            update_groups2() &&
            true);
    }
    exports.update_groups = update_groups;
    function update_groups2() {
        const users_public = ts_firebase_rules_4.getData('users_public', ts_firebase_rules_4.request.auth.uid);
        return (users_public.role === ts_firebase_rules_4.str('admin'));
    }
    exports.update_groups2 = update_groups2;
    function validateGroupPercentageCalculationConfigs(gpcc, minSalePrice) {
        return (gpcc.size() === 0 ||
            (gpcc.size() >= _globalVariables_2._globalVariables_.$_min_groupPercentageCalculationConfigs &&
                gpcc.size() <= _globalVariables_2._globalVariables_.$_max_groupPercentageCalculationConfigs &&
                (ts_firebase_rules_4.isInt(gpcc[0].percentage) &&
                    ts_firebase_rules_4.isInt(gpcc[0].nextLvl) &&
                    gpcc[0].percentage >= 0 &&
                    gpcc[0].percentage <= 100 &&
                    gpcc[0].nextLvl >= 0 &&
                    gpcc[0].nextLvl >= minSalePrice) &&
                gpccA(gpcc, 1) &&
                gpccA(gpcc, 2) &&
                gpccA(gpcc, 3) &&
                gpccA(gpcc, 4) &&
                gpccA(gpcc, 5) &&
                gpccA(gpcc, 6) &&
                gpccA(gpcc, 7) &&
                gpccA(gpcc, 8) &&
                gpccA(gpcc, 9) &&
                gpccA(gpcc, 10) &&
                gpccA(gpcc, 11) &&
                gpccA(gpcc, 12) &&
                gpccA(gpcc, 13) &&
                gpccA(gpcc, 14) &&
                gpccA(gpcc, 15) &&
                gpccA(gpcc, 16) &&
                gpccA(gpcc, 17) &&
                gpccA(gpcc, 18) &&
                gpccA(gpcc, 19) &&
                gpccA(gpcc, 20) &&
                gpccA(gpcc, 21) &&
                gpccA(gpcc, 22) &&
                gpccA(gpcc, 23) &&
                gpccA(gpcc, 24) &&
                gpccA(gpcc, 25) &&
                gpccA(gpcc, 26) &&
                gpccA(gpcc, 27) &&
                gpccA(gpcc, 28) &&
                gpccA(gpcc, 29) &&
                gpccA(gpcc, 30) &&
                gpccA(gpcc, 31) &&
                gpccA(gpcc, 32) &&
                gpccA(gpcc, 33) &&
                gpccA(gpcc, 34) &&
                gpccA(gpcc, 35) &&
                gpccA(gpcc, 36) &&
                gpccA(gpcc, 37) &&
                gpccA(gpcc, 38) &&
                gpccA(gpcc, 39) &&
                true));
    }
    exports.validateGroupPercentageCalculationConfigs = validateGroupPercentageCalculationConfigs;
    function gpccA(gpcc, index) {
        return (gpcc.size() < index + 1 ||
            (gpcc.size() >= index + 1 &&
                ts_firebase_rules_4.isInt(gpcc[index].percentage) &&
                ts_firebase_rules_4.isInt(gpcc[index].nextLvl) &&
                gpcc[index].percentage >= 0 &&
                gpcc[index].percentage <= 100 &&
                gpcc[index].percentage > gpcc[index - 1].percentage &&
                gpcc[index].nextLvl > gpcc[index - 1].nextLvl &&
                gpcc[index].nextLvl >= 0));
    }
    exports.gpccA = gpccA;
});
define("smartNet/tsfr/functions/groups/index", ["require", "exports", "smartNet/tsfr/functions/groups/create_groups", "smartNet/tsfr/functions/groups/read_groups", "smartNet/tsfr/functions/groups/update_groups"], function (require, exports, create_groups_1, read_groups_1, update_groups_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(create_groups_1, exports);
    __exportStar(read_groups_1, exports);
    __exportStar(update_groups_1, exports);
});
define("smartNet/tsfr/functions/users_public/create_user_public_marketer", ["require", "exports", "ts-firebase-rules-final_/index", "smartNet/tsfr/functions/otherFns/index"], function (require, exports, ts_firebase_rules_5, otherFns_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create_user_public_admin = exports.create_user_public_marketer2 = exports.create_user_public_marketer = exports.create_user_public = void 0;
    function create_user_public(id) {
        const reqData = ts_firebase_rules_5.getReq();
        return (!ts_firebase_rules_5.docExists(id, 'users_public') &&
            otherFns_4.loggedIn() &&
            ts_firebase_rules_5.request.auth.uid === id &&
            ts_firebase_rules_5.fieldsEqualTo([
                'role',
                'username',
                'realDepth',
                'refId',
                'path',
                'disabled',
                'groupId'
            ]) &&
            reqData.username === ts_firebase_rules_5.request.auth.token.email &&
            reqData.disabled === false &&
            ts_firebase_rules_5.isString(reqData.refId) &&
            ((create_user_public_admin()) ||
                (create_user_public_marketer())) &&
            true);
    }
    exports.create_user_public = create_user_public;
    function create_user_public_marketer() {
        const reqData = ts_firebase_rules_5.getReq();
        return (reqData.role === ts_firebase_rules_5.str('marketer') &&
            ts_firebase_rules_5.docExists(reqData.refId, 'users_public') &&
            ts_firebase_rules_5.docExists(reqData.groupId, 'groups') &&
            create_user_public_marketer2(reqData) &&
            true);
    }
    exports.create_user_public_marketer = create_user_public_marketer;
    function create_user_public_marketer2(reqData) {
        const ref_user_public = ts_firebase_rules_5.getData('users_public', reqData.refId);
        const ref_user_private = ts_firebase_rules_5.getData('users_private', reqData.refId);
        return (ref_user_public.disabled === false &&
            reqData.realDepth === ref_user_public.realDepth + 1 &&
            reqData.path === ref_user_public.path.concat([ts_firebase_rules_5.request.auth.uid]) &&
            reqData.groupId === ref_user_public.groupId &&
            ref_user_private.status === ts_firebase_rules_5.str('confirmed') &&
            true);
    }
    exports.create_user_public_marketer2 = create_user_public_marketer2;
    function create_user_public_admin() {
        const reqData = ts_firebase_rules_5.getReq();
        const expectedPath = [ts_firebase_rules_5.request.auth.uid];
        return (reqData.role === ts_firebase_rules_5.str('admin') &&
            reqData.refId === ts_firebase_rules_5.request.auth.uid &&
            reqData.realDepth === 0 &&
            reqData.path === expectedPath &&
            reqData.groupId === ts_firebase_rules_5.request.auth.uid);
    }
    exports.create_user_public_admin = create_user_public_admin;
});
define("smartNet/tsfr/functions/users_public/read_user_public", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.read_user_public = void 0;
    function read_user_public(id) {
        return (true);
    }
    exports.read_user_public = read_user_public;
});
define("smartNet/tsfr/functions/users_public/update_user_public", ["require", "exports", "smartNet/tsfr/functions/otherFns/index", "ts-firebase-rules-final_/index"], function (require, exports, otherFns_5, ts_firebase_rules_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.update_user_public_b = exports.update_user_public_a = exports.update_user_public = void 0;
    function update_user_public(id) {
        return (ts_firebase_rules_6.docExists(ts_firebase_rules_6.request.auth.uid, 'users_private') &&
            ts_firebase_rules_6.docExists(ts_firebase_rules_6.request.auth.uid, 'users_public') &&
            otherFns_5.loggedIn() &&
            ((update_user_public_a(id)) ||
                (update_user_public_b())));
    }
    exports.update_user_public = update_user_public;
    function update_user_public_a(id) {
        const reqData = ts_firebase_rules_6.getReq();
        return (ts_firebase_rules_6.request.auth.uid === id &&
            ts_firebase_rules_6.allowToUpdate([
                'disabled'
            ]) &&
            ts_firebase_rules_6.isBool(reqData.disabled) &&
            true);
    }
    exports.update_user_public_a = update_user_public_a;
    function update_user_public_b() {
        const reqData = ts_firebase_rules_6.getReq();
        const currentValues = ts_firebase_rules_6.getCurrentValues();
        return (ts_firebase_rules_6.request.auth.uid === currentValues.refId &&
            ts_firebase_rules_6.allowToUpdate([
                'disabled'
            ]) &&
            ts_firebase_rules_6.isBool(reqData.disabled) &&
            true);
    }
    exports.update_user_public_b = update_user_public_b;
});
define("smartNet/tsfr/functions/users_public/index", ["require", "exports", "smartNet/tsfr/functions/users_public/create_user_public_marketer", "smartNet/tsfr/functions/users_public/read_user_public", "smartNet/tsfr/functions/users_public/update_user_public"], function (require, exports, create_user_public_marketer_1, read_user_public_1, update_user_public_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(create_user_public_marketer_1, exports);
    __exportStar(read_user_public_1, exports);
    __exportStar(update_user_public_1, exports);
});
define("smartNet/tsfr/functions/users_private/create_user_private", ["require", "exports", "ts-firebase-rules-final_/index", "smartNet/tsfr/functions/otherFns/index"], function (require, exports, ts_firebase_rules_7, otherFns_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create_user_private_marketer = exports.create_user_private_admin = exports.create_user_private2 = exports.create_user_private = void 0;
    function create_user_private(id) {
        const reqData = ts_firebase_rules_7.getReq();
        return (!ts_firebase_rules_7.docExists(id, 'users_private') &&
            ts_firebase_rules_7.docExistsAfter(ts_firebase_rules_7.request.auth.uid, 'users_public') &&
            otherFns_6.loggedIn() &&
            ts_firebase_rules_7.request.auth.uid === id &&
            ts_firebase_rules_7.fieldsEqualTo([
                'role',
                'username',
                'realDepth',
                'path',
                'refId',
                'disabled',
                'groupId',
                'refUsername',
                'firstName',
                'lastName',
                'number',
                'status',
                'favorite',
                'rank',
                'archived',
                'personalSale',
                'total_personalSale',
                'profit',
                'total_profit'
            ]) &&
            ts_firebase_rules_7.isString(reqData.firstName) && ts_firebase_rules_7.strBetween('firstName', 1, 30) &&
            ts_firebase_rules_7.isString(reqData.lastName) && ts_firebase_rules_7.strBetween('lastName', 1, 30) &&
            ts_firebase_rules_7.isString(reqData.number) && ts_firebase_rules_7.strBetween('number', 1, 15) &&
            reqData.personalSale === 0 &&
            reqData.total_personalSale === 0 &&
            reqData.profit === 0 &&
            reqData.total_profit === 0 &&
            reqData.favorite === false &&
            reqData.rank === 0 &&
            reqData.archived === false &&
            ((create_user_private_admin()) ||
                (create_user_private_marketer())) &&
            create_user_private2(id, reqData) &&
            true);
    }
    exports.create_user_private = create_user_private;
    function create_user_private2(id, reqData) {
        const users_public = ts_firebase_rules_7.getDataAfter('users_public', id);
        const users_public_ref = ts_firebase_rules_7.getDataAfter('users_public', users_public.refId);
        return (reqData.refUsername === users_public_ref.username &&
            reqData.username === users_public.username &&
            reqData.realDepth === users_public.realDepth &&
            reqData.refId === users_public.refId &&
            reqData.path === users_public.path &&
            reqData.role === users_public.role &&
            reqData.disabled === users_public.disabled &&
            reqData.groupId === users_public.groupId);
    }
    exports.create_user_private2 = create_user_private2;
    function create_user_private_admin() {
        const reqData = ts_firebase_rules_7.getReq();
        return (reqData.role === ts_firebase_rules_7.str('admin') &&
            reqData.status === ts_firebase_rules_7.str('confirmed'));
    }
    exports.create_user_private_admin = create_user_private_admin;
    function create_user_private_marketer() {
        const reqData = ts_firebase_rules_7.getReq();
        return (reqData.role === ts_firebase_rules_7.str('marketer') &&
            reqData.status === ts_firebase_rules_7.str('unConfirmed'));
    }
    exports.create_user_private_marketer = create_user_private_marketer;
});
define("smartNet/tsfr/functions/users_private/get_user_private", ["require", "exports", "ts-firebase-rules-final_/index", "smartNet/tsfr/functions/otherFns/index"], function (require, exports, ts_firebase_rules_8, otherFns_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.get_user_private = void 0;
    function get_user_private(id) {
        const currentValues = ts_firebase_rules_8.getCurrentValues();
        return (ts_firebase_rules_8.docExists(ts_firebase_rules_8.request.auth.uid, 'users_public') &&
            ts_firebase_rules_8.docExists(ts_firebase_rules_8.request.auth.uid, 'users_private') &&
            otherFns_7.loggedIn() &&
            currentValues.path.hasAny([ts_firebase_rules_8.request.auth.uid]) &&
            true);
    }
    exports.get_user_private = get_user_private;
});
define("smartNet/tsfr/functions/users_private/update_user_private", ["require", "exports", "ts-firebase-rules-final_/index", "smartNet/tsfr/functions/otherFns/index"], function (require, exports, ts_firebase_rules_9, otherFns_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.userIsUpdatingItsOwnData = exports.refIsUpdatingUser_private = exports.adminIsUpdatingUserAfterASaleConfirmation = exports.adminIsPayingOff = exports.update_user_private2 = exports.update_user_private = void 0;
    function update_user_private(id) {
        return (ts_firebase_rules_9.docExists(ts_firebase_rules_9.request.auth.uid, 'users_public') &&
            ts_firebase_rules_9.docExists(ts_firebase_rules_9.request.auth.uid, 'users_private') &&
            otherFns_8.loggedIn() &&
            update_user_private2(id));
    }
    exports.update_user_private = update_user_private;
    function update_user_private2(id) {
        const users_public = ts_firebase_rules_9.getData('users_public', ts_firebase_rules_9.request.auth.uid);
        return (userIsUpdatingItsOwnData(id) ||
            refIsUpdatingUser_private(id, users_public.groupId) ||
            adminIsUpdatingUserAfterASaleConfirmation(users_public.role) ||
            adminIsPayingOff(users_public.role));
    }
    exports.update_user_private2 = update_user_private2;
    function adminIsPayingOff(role) {
        const currentValues = ts_firebase_rules_9.getCurrentValues();
        const reqData = ts_firebase_rules_9.getReq();
        return (currentValues.path.hasAny([ts_firebase_rules_9.request.auth.uid]) &&
            (role === ts_firebase_rules_9.str('admin') ||
                role === ts_firebase_rules_9.str('sub_admin')) &&
            ts_firebase_rules_9.allowToUpdate([
                'personalSale',
                'profit',
                'lastPayoffTime'
            ]) &&
            reqData.personalSale === 0 &&
            reqData.profit === 0);
    }
    exports.adminIsPayingOff = adminIsPayingOff;
    function adminIsUpdatingUserAfterASaleConfirmation(role) {
        const currentValues = ts_firebase_rules_9.getCurrentValues();
        const reqData = ts_firebase_rules_9.getReq();
        return (currentValues.path.hasAny([ts_firebase_rules_9.request.auth.uid]) &&
            (role === ts_firebase_rules_9.str('admin') ||
                role === ts_firebase_rules_9.str('sub_admin')) &&
            ts_firebase_rules_9.allowToUpdate([
                'personalSale',
                'total_personalSale',
                'profit',
                'total_profit',
                'rank'
            ]) &&
            ts_firebase_rules_9.isInt(reqData.personalSale) && reqData.personalSale >= 0 &&
            ts_firebase_rules_9.isInt(reqData.total_personalSale) && reqData.total_personalSale >= 0 &&
            ts_firebase_rules_9.isInt(reqData.profit) && reqData.profit >= 0 &&
            ts_firebase_rules_9.isInt(reqData.total_profit) && reqData.total_profit >= 0 &&
            ts_firebase_rules_9.isInt(reqData.rank));
    }
    exports.adminIsUpdatingUserAfterASaleConfirmation = adminIsUpdatingUserAfterASaleConfirmation;
    function refIsUpdatingUser_private(id, groupId) {
        const reqData = ts_firebase_rules_9.getReq();
        const currentValues = ts_firebase_rules_9.getCurrentValues();
        const group = ts_firebase_rules_9.getData('groups', groupId);
        return (ts_firebase_rules_9.request.auth.uid === currentValues.refId &&
            currentValues.refId != id &&
            ts_firebase_rules_9.allowToUpdate([
                'favorite',
                'status',
                'confirmedTime',
                'archived'
            ]) &&
            ts_firebase_rules_9.isBool(reqData.favorite) &&
            ts_firebase_rules_9.isBool(reqData.archived) &&
            (reqData.status === ts_firebase_rules_9.str('confirmed') || reqData.status === ts_firebase_rules_9.str('unConfirmed')) &&
            group.active &&
            true);
    }
    exports.refIsUpdatingUser_private = refIsUpdatingUser_private;
    function userIsUpdatingItsOwnData(id) {
        const reqData = ts_firebase_rules_9.getReq();
        return (ts_firebase_rules_9.request.auth.uid === id &&
            ts_firebase_rules_9.allowToUpdate([
                'firstName',
                'lastName',
                'number'
            ]) &&
            ts_firebase_rules_9.isString(reqData.firstName) && ts_firebase_rules_9.strBetween('firstName', 1, 30) &&
            ts_firebase_rules_9.isString(reqData.lastName) && ts_firebase_rules_9.strBetween('lastName', 1, 30) &&
            ts_firebase_rules_9.isString(reqData.number) && ts_firebase_rules_9.strBetween('number', 1, 15) &&
            true);
    }
    exports.userIsUpdatingItsOwnData = userIsUpdatingItsOwnData;
});
define("smartNet/tsfr/functions/users_private/list_user_private", ["require", "exports", "ts-firebase-rules-final_/index", "smartNet/tsfr/functions/otherFns/index"], function (require, exports, ts_firebase_rules_10, otherFns_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.list_user_private = void 0;
    function list_user_private(id) {
        const currentValues = ts_firebase_rules_10.getCurrentValues();
        return (ts_firebase_rules_10.docExists(ts_firebase_rules_10.request.auth.uid, 'users_public') &&
            ts_firebase_rules_10.docExists(ts_firebase_rules_10.request.auth.uid, 'users_private') &&
            otherFns_9.loggedIn() &&
            (currentValues.path.hasAny([ts_firebase_rules_10.request.auth.uid])) &&
            true);
    }
    exports.list_user_private = list_user_private;
});
define("smartNet/tsfr/functions/users_private/index", ["require", "exports", "smartNet/tsfr/functions/users_private/create_user_private", "smartNet/tsfr/functions/users_private/get_user_private", "smartNet/tsfr/functions/users_private/update_user_private", "smartNet/tsfr/functions/users_private/list_user_private"], function (require, exports, create_user_private_1, get_user_private_1, update_user_private_1, list_user_private_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(create_user_private_1, exports);
    __exportStar(get_user_private_1, exports);
    __exportStar(update_user_private_1, exports);
    __exportStar(list_user_private_1, exports);
});
define("smartNet/tsfr/functions/messages/create_messages", ["require", "exports", "ts-firebase-rules-final_/index", "smartNet/tsfr/functions/otherFns/index"], function (require, exports, ts_firebase_rules_11, otherFns_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create_messages2 = exports.create_messages = void 0;
    function create_messages(id) {
        const reqData = ts_firebase_rules_11.getReq();
        return (ts_firebase_rules_11.docExists(ts_firebase_rules_11.request.auth.uid, 'users_public') &&
            ts_firebase_rules_11.docExists(ts_firebase_rules_11.request.auth.uid, 'users_private') &&
            !ts_firebase_rules_11.docExists(id, 'messages') &&
            otherFns_10.loggedIn() &&
            ts_firebase_rules_11.fieldsEqualTo([
                'sender',
                'senderUsername',
                'reciever',
                'recieverUsername',
                'title',
                'content',
                'status'
            ]) &&
            ts_firebase_rules_11.docExists(reqData.reciever, 'users_public') &&
            ts_firebase_rules_11.docExists(reqData.reciever, 'users_private') &&
            reqData.sender === ts_firebase_rules_11.request.auth.uid &&
            reqData.sender != reqData.reciever &&
            reqData.senderUsername === ts_firebase_rules_11.request.auth.token.email &&
            reqData.status === ts_firebase_rules_11.str('unRead') &&
            ts_firebase_rules_11.isString(reqData.title) && ts_firebase_rules_11.strBetween('title', 1, 50) &&
            ts_firebase_rules_11.isString(reqData.content) && ts_firebase_rules_11.strBetween('content', 1, 1000) &&
            create_messages2(reqData));
    }
    exports.create_messages = create_messages;
    function create_messages2(reqData) {
        const users_public = ts_firebase_rules_11.getData('users_public', ts_firebase_rules_11.request.auth.uid);
        const users_private = ts_firebase_rules_11.getData('users_private', ts_firebase_rules_11.request.auth.uid);
        const users_private_ref = ts_firebase_rules_11.getData('users_private', reqData.reciever);
        return (users_private.status === ts_firebase_rules_11.str('confirmed') &&
            reqData.recieverUsername === users_private_ref.username &&
            users_public.disabled === false &&
            true);
    }
    exports.create_messages2 = create_messages2;
});
define("smartNet/tsfr/functions/messages/read_messages", ["require", "exports", "ts-firebase-rules-final_/index", "smartNet/tsfr/functions/otherFns/index"], function (require, exports, ts_firebase_rules_12, otherFns_11) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.read_messages2 = exports.read_messages = void 0;
    function read_messages(id) {
        const currentValues = ts_firebase_rules_12.getCurrentValues();
        return (ts_firebase_rules_12.docExists(ts_firebase_rules_12.request.auth.uid, 'users_public') &&
            ts_firebase_rules_12.docExists(ts_firebase_rules_12.request.auth.uid, 'users_private') &&
            otherFns_11.loggedIn() &&
            ((currentValues.reciever === ts_firebase_rules_12.request.auth.uid) ||
                (currentValues.sender === ts_firebase_rules_12.request.auth.uid)) &&
            read_messages2());
    }
    exports.read_messages = read_messages;
    function read_messages2() {
        const users_public = ts_firebase_rules_12.getData('users_public', ts_firebase_rules_12.request.auth.uid);
        const users_private = ts_firebase_rules_12.getData('users_private', ts_firebase_rules_12.request.auth.uid);
        return (users_private.status === ts_firebase_rules_12.str('confirmed') &&
            users_public.disabled === false);
    }
    exports.read_messages2 = read_messages2;
});
define("smartNet/tsfr/functions/messages/update_messages", ["require", "exports", "ts-firebase-rules-final_/index", "smartNet/tsfr/functions/otherFns/index"], function (require, exports, ts_firebase_rules_13, otherFns_12) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.update_message_sender = exports.update_message_reciever = exports.update_messages2 = exports.update_messages = void 0;
    function update_messages(id) {
        return (ts_firebase_rules_13.docExists(ts_firebase_rules_13.request.auth.uid, 'users_public') &&
            ts_firebase_rules_13.docExists(ts_firebase_rules_13.request.auth.uid, 'users_private') &&
            ts_firebase_rules_13.docExists(id, 'messages') &&
            otherFns_12.loggedIn() &&
            ((update_message_reciever()) || (update_message_sender())) &&
            update_messages2());
    }
    exports.update_messages = update_messages;
    function update_messages2() {
        const users_public = ts_firebase_rules_13.getData('users_public', ts_firebase_rules_13.request.auth.uid);
        const users_private = ts_firebase_rules_13.getData('users_private', ts_firebase_rules_13.request.auth.uid);
        return (users_private.status === ts_firebase_rules_13.str('confirmed') &&
            users_public.disabled === false);
    }
    exports.update_messages2 = update_messages2;
    function update_message_reciever() {
        const reqData = ts_firebase_rules_13.getReq();
        const currentValues = ts_firebase_rules_13.getCurrentValues();
        return (currentValues.reciever === ts_firebase_rules_13.request.auth.uid &&
            ts_firebase_rules_13.allowToUpdate([
                'status'
            ]) &&
            reqData.status === ts_firebase_rules_13.str('read'));
    }
    exports.update_message_reciever = update_message_reciever;
    function update_message_sender() {
        const reqData = ts_firebase_rules_13.getReq();
        return (ts_firebase_rules_13.allowToUpdate([
            'title',
            'content'
        ]) &&
            ts_firebase_rules_13.isString(reqData.title) && ts_firebase_rules_13.strBetween('title', 1, 50) &&
            ts_firebase_rules_13.isString(reqData.content) && ts_firebase_rules_13.strBetween('content', 1, 1000));
    }
    exports.update_message_sender = update_message_sender;
});
define("smartNet/tsfr/functions/messages/index", ["require", "exports", "smartNet/tsfr/functions/messages/create_messages", "smartNet/tsfr/functions/messages/read_messages", "smartNet/tsfr/functions/messages/update_messages"], function (require, exports, create_messages_1, read_messages_1, update_messages_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(create_messages_1, exports);
    __exportStar(read_messages_1, exports);
    __exportStar(update_messages_1, exports);
});
define("smartNet/tsfr/functions/sales/create_sale", ["require", "exports", "ts-firebase-rules-final_/index", "smartNet/tsfr/functions/otherFns/index"], function (require, exports, ts_firebase_rules_14, otherFns_13) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.create_sale3 = exports.create_sale2 = exports.create_sale = void 0;
    function create_sale(id) {
        const reqData = ts_firebase_rules_14.getReq();
        return (ts_firebase_rules_14.docExists(ts_firebase_rules_14.request.auth.uid, 'users_public') &&
            ts_firebase_rules_14.docExists(ts_firebase_rules_14.request.auth.uid, 'users_private') &&
            !ts_firebase_rules_14.docExists(id, 'sales') &&
            otherFns_13.loggedIn() &&
            ts_firebase_rules_14.fieldsEqualTo([
                'marketerId',
                'status',
                'statusMsgId',
                'statusChangedById',
                'statusChangedByUsername',
                'path',
                'firstName',
                'lastName',
                'number',
                'price',
                'comments'
            ]) &&
            reqData.marketerId === ts_firebase_rules_14.request.auth.uid &&
            reqData.status === ts_firebase_rules_14.str('unConfirmed') &&
            reqData.statusMsgId === ts_firebase_rules_14.str('') &&
            reqData.statusChangedById === ts_firebase_rules_14.str('') &&
            reqData.statusChangedByUsername === ts_firebase_rules_14.str('') &&
            ts_firebase_rules_14.isString(reqData.firstName) && ts_firebase_rules_14.strBetween('firstName', 1, 30) &&
            ts_firebase_rules_14.isString(reqData.lastName) && ts_firebase_rules_14.strBetween('lastName', 1, 30) &&
            ts_firebase_rules_14.isString(reqData.number) && ts_firebase_rules_14.strBetween('number', 1, 30) &&
            ts_firebase_rules_14.isString(reqData.comments) && ts_firebase_rules_14.strBetween('comments', 0, 100) &&
            create_sale2(reqData, reqData.path[0]) &&
            create_sale3(reqData));
    }
    exports.create_sale = create_sale;
    function create_sale2(reqData, groupId) {
        const group = ts_firebase_rules_14.getData('groups', groupId);
        return (group.active &&
            ts_firebase_rules_14.isInt(reqData.price) && reqData.price <= group.maxSalePrice && reqData.price >= group.minSalePrice);
    }
    exports.create_sale2 = create_sale2;
    function create_sale3(reqData) {
        const users_public = ts_firebase_rules_14.getData('users_public', ts_firebase_rules_14.request.auth.uid);
        const users_private = ts_firebase_rules_14.getData('users_private', ts_firebase_rules_14.request.auth.uid);
        return (reqData.path === users_public.path &&
            users_private.status === ts_firebase_rules_14.str('confirmed') &&
            users_public.disabled === false);
    }
    exports.create_sale3 = create_sale3;
});
define("smartNet/tsfr/functions/sales/read_sale", ["require", "exports", "ts-firebase-rules-final_/index", "smartNet/tsfr/functions/otherFns/index"], function (require, exports, ts_firebase_rules_15, otherFns_14) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.read_sale2 = exports.read_sale = void 0;
    function read_sale(id) {
        return (ts_firebase_rules_15.docExists(ts_firebase_rules_15.request.auth.uid, 'users_public') &&
            ts_firebase_rules_15.docExists(ts_firebase_rules_15.request.auth.uid, 'users_private') &&
            otherFns_14.loggedIn() &&
            read_sale2());
    }
    exports.read_sale = read_sale;
    function read_sale2() {
        const users_public = ts_firebase_rules_15.getData('users_public', ts_firebase_rules_15.request.auth.uid);
        const users_private = ts_firebase_rules_15.getData('users_private', ts_firebase_rules_15.request.auth.uid);
        const currentValues = ts_firebase_rules_15.getCurrentValues();
        return (users_private.status === ts_firebase_rules_15.str('confirmed') &&
            users_public.disabled === false &&
            (((users_public.role === ts_firebase_rules_15.str('admin') || users_public.role === ts_firebase_rules_15.str('sub_admin')) &&
                (currentValues.path.hasAny([ts_firebase_rules_15.request.auth.uid]) ||
                    currentValues.marketerId === ts_firebase_rules_15.request.auth.uid)) || (users_public.role === ts_firebase_rules_15.str('marketer') &&
                currentValues.marketerId === ts_firebase_rules_15.request.auth.uid)));
    }
    exports.read_sale2 = read_sale2;
});
define("smartNet/tsfr/functions/sales/update_sale", ["require", "exports", "ts-firebase-rules-final_/index", "smartNet/tsfr/functions/otherFns/index"], function (require, exports, ts_firebase_rules_16, otherFns_15) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.conditionsThatNeed_group = exports.update_sale_marketer = exports.update_sale_admin = exports.update_sale2 = exports.update_sale = void 0;
    function update_sale(id) {
        const currentValues = ts_firebase_rules_16.getCurrentValues();
        return (ts_firebase_rules_16.docExists(ts_firebase_rules_16.request.auth.uid, 'users_public') &&
            ts_firebase_rules_16.docExists(ts_firebase_rules_16.request.auth.uid, 'users_private') &&
            ts_firebase_rules_16.docExists(id, 'sales') &&
            otherFns_15.loggedIn() &&
            currentValues.path.hasAny([ts_firebase_rules_16.request.auth.uid]) &&
            update_sale2());
    }
    exports.update_sale = update_sale;
    function update_sale2() {
        const users_public = ts_firebase_rules_16.getData('users_public', ts_firebase_rules_16.request.auth.uid);
        const users_private = ts_firebase_rules_16.getData('users_private', ts_firebase_rules_16.request.auth.uid);
        return (users_private.status === ts_firebase_rules_16.str('confirmed') &&
            users_public.disabled === false &&
            ((update_sale_marketer()) ||
                (update_sale_admin(users_public))));
    }
    exports.update_sale2 = update_sale2;
    function update_sale_admin(users_public) {
        const reqData = ts_firebase_rules_16.getReq();
        return ((users_public.role === ts_firebase_rules_16.str('admin') ||
            users_public.role === ts_firebase_rules_16.str('sub_admin')) &&
            reqData.statusChangedById === ts_firebase_rules_16.request.auth.uid &&
            reqData.statusChangedByUsername === ts_firebase_rules_16.request.auth.token.email &&
            (reqData.status === ts_firebase_rules_16.str('confirmed') ||
                reqData.status === ts_firebase_rules_16.str('rejected')) &&
            ts_firebase_rules_16.allowToUpdate([
                'status',
                'statusMsgId',
                'statusChangedById',
                'statusChangedByUsername',
                'confirmedTime'
            ]));
    }
    exports.update_sale_admin = update_sale_admin;
    function update_sale_marketer() {
        const reqData = ts_firebase_rules_16.getReq();
        const currentValues = ts_firebase_rules_16.getCurrentValues();
        return (currentValues.status === ts_firebase_rules_16.str('rejected') &&
            reqData.status === ts_firebase_rules_16.str('unConfirmed') &&
            currentValues.marketerId === ts_firebase_rules_16.request.auth.uid &&
            ts_firebase_rules_16.allowToUpdate([
                'firstName',
                'lastName',
                'number',
                'status',
                'price',
                'comments'
            ]) &&
            ts_firebase_rules_16.isString(reqData.firstName) && ts_firebase_rules_16.strBetween('firstName', 1, 30) &&
            ts_firebase_rules_16.isString(reqData.lastName) && ts_firebase_rules_16.strBetween('lastName', 1, 30) &&
            ts_firebase_rules_16.isString(reqData.number) && ts_firebase_rules_16.strBetween('number', 1, 30) &&
            ts_firebase_rules_16.isString(reqData.comments) && ts_firebase_rules_16.strBetween('comments', 0, 100) &&
            conditionsThatNeed_group(reqData, currentValues.path[0]));
    }
    exports.update_sale_marketer = update_sale_marketer;
    function conditionsThatNeed_group(reqData, groupId) {
        const group = ts_firebase_rules_16.getData('groups', groupId);
        return (ts_firebase_rules_16.isInt(reqData.price) && reqData.price < group.maxSalePrice && reqData.price > group.minSalePrice);
    }
    exports.conditionsThatNeed_group = conditionsThatNeed_group;
});
define("smartNet/tsfr/functions/sales/index", ["require", "exports", "smartNet/tsfr/functions/sales/create_sale", "smartNet/tsfr/functions/sales/read_sale", "smartNet/tsfr/functions/sales/update_sale"], function (require, exports, create_sale_1, read_sale_1, update_sale_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(create_sale_1, exports);
    __exportStar(read_sale_1, exports);
    __exportStar(update_sale_1, exports);
});
define("smartNet/tsfr/index", ["require", "exports", "ts-firebase-rules-final_/index", "smartNet/tsfr/functions/groups/index", "smartNet/tsfr/functions/users_public/index", "smartNet/tsfr/functions/users_private/index", "smartNet/tsfr/functions/messages/index", "smartNet/tsfr/functions/sales/index"], function (require, exports, ts_firebase_rules_17, groups_1, users_public_1, users_private_1, messages_1, sales_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ts_firebase_rules_17.setRuleStructure(() => ({
        'users_public': (id) => ({
            create: users_public_1.create_user_public(id),
            update: users_public_1.update_user_public(id),
            read: users_public_1.read_user_public(id),
        }),
        'users_private': (id) => ({
            create: users_private_1.create_user_private(id),
            update: users_private_1.update_user_private(id),
            get: users_private_1.get_user_private(id),
            list: users_private_1.list_user_private(id),
        }),
        'groups': (id) => ({
            create: groups_1.create_groups(id),
            update: groups_1.update_groups(id),
            read: groups_1.read_groups(id),
        }),
        'sales': (id) => ({
            create: sales_1.create_sale(id),
            update: sales_1.update_sale(id),
            read: sales_1.read_sale(id),
        }),
        'messages': (id) => ({
            create: messages_1.create_messages(id),
            update: messages_1.update_messages(id),
            read: messages_1.read_messages(id),
        }),
        'app/appData': () => ({
            write: true,
            read: true,
        }),
    }));
});
