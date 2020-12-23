/* eslint-disable no-var */
/* eslint-disable no-constant-condition */
var allowed;

switch (true) {
    case true:
        for (var i = 0; i < 2; i++) {
            allowed = false;
            if (1 + 1 == 2) {
                allowed = true;
                i = 3;
            }
        }
        break;
}

console.log(allowed);