var build_cb = function () {
    var chessboard_matrix = new Array(9);
    chessboard_matrix[0] = ["", "", "", "", "", "", "", "", ""];
    chessboard_matrix[1] = ["", "rqb", "kqb", "bqb", "qb", "kb", "bkb", "kkb", "rkb"];
    chessboard_matrix[2] = ["", "p1b", "p2b", "p3b", "p4b", "p5b", "p6b", "p7b", "p8b"];
    chessboard_matrix[3] = ["", "", "", "", "", "", "", "", ""];
    chessboard_matrix[4] = ["", "", "", "", "", "", "", "", ""];
    chessboard_matrix[5] = ["", "", "", "", "", "", "", "", ""];
    chessboard_matrix[6] = ["", "", "", "", "", "", "", "", ""];
    chessboard_matrix[7] = ["", "p1n", "p2n", "p3n", "p4n", "p5n", "p6n", "p7n", "p8n"];
    chessboard_matrix[8] = ["", "rqn", "kqn", "bqn", "qn", "kn", "bkn", "kkn", "rkn"];
    return chessboard_matrix;
};
function coo_y (j )  {
	if (j==1) {return 'a';}if (j==2) {return 'b';}if (j==3) {return 'c';}
	if (j==4) {return 'd';}if (j==5) {return 'e';}if (j==6) {return 'f';}
	if (j==7) {return 'g';}if (j==8) {return 'h';}return "";
}
var get_column = function (idx) {
    return idx > 8 ? '' : String.fromCharCode(idx + 96);
};

var columnToNumber = function (co) {
    var charCode = co.charCodeAt(0);
    return charCode > 104 ? '0' : charCode - 96 + '';
};

var initArray = function (length) {
    var arr = new Array(length);
    for (var i = 0; i < length; i++) {
        arr[i] = new Array(8);
    }  //8 rows 8 columns
    return arr;
};



function howMannyPieces(str) {
    var num = 0;
    var x = 0;
    var y = 0;
    for (i = 8; i > 0; i--) {
        for (y = 1; y < 9; y++) {
            if (cb[i][y] != "") {

                num += 1;
            }
        }
    }
    console.log(str, '.....utility->numero pezzi->', num);
}


function consollex() { //pulisci
    console.log(cb_x[1]);
    console.log(cb_x[2]);
    console.log(cb_x[3]);
    console.log(cb_x[4]);
    console.log(cb_x[5]);
    console.log(cb_x[6]);
    console.log(cb_x[7]);
    console.log(cb_x[8]);
}
function consolley() { //pulisci
    console.log(cb_y[1]);
    console.log(cb_y[2]);
    console.log(cb_y[3]);
    console.log(cb_y[4]);
    console.log(cb_y[5]);
    console.log(cb_y[6]);
    console.log(cb_y[7]);
    console.log(cb_y[8]);
}
