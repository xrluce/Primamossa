(function ($) {
   $.fn.chessboard = function (opt) {   //jQuery.fn === jQuery.prototype
   var  that=this;
      this.fentrans="";//preso da root e dato a little
      var aaa_fentrans=[];
      var aaa_arrocco=[];
      var myfen=""; //controlla forse deve essere cancellato
      var fen_little="";//controlla forse deve essere cancellato
      var numero_mossa = 0;
      var numero_totale_mosse=0;
      var animation = true;
      var flag_end  = true;
      var f_LastMossa=0;
      var flag_aspetta_che_termina=true;
      var kk2b, kk2n, q2b, q2n, kn, rkn, rqn, bkn, bqn, kqn, kkn, qn, kb, rkb, rqb, bkb,
      bqb, kqb, kkb, qb, p1n, p2n, p3n, p4n, p5n, p6n, p7n, p8n, p1b, p2b, p3b, p4b, p5b, p6b, p7b, p8b;
      var a_mosse = [];
      var a_mosse_2pezzo = [];
      var a_mosse_em = [];
      var acb = [];     //i pezzi sulla scacchiera
      var	acb_c = [];//la casella in cui si trovano i pezzi
      this.tutte_txt="";
      var t_AKN=true;var t_AQN=true;var t_AKB=true;var t_AQB=true;
      var cb = [];
      var cb_x = [];
      var cb_y = [];
      var board_white = true;
      var flag_animation = false;
      var	flag_avanti=1;//VIP se viene premuto troppo velocemente da avanti
      var flag_indietro=1
      //var case_width = $(".da1:eq(0)").outerWidth();
      var case_width = 50;
      var my_div;
      var trimed_mossa = "";
      this.ok_my_div="";
        var defaults = {
            mossa: "",
            continua: 0,
            num_mossa_server: 0,
            trans: 0,
            _div: "",
            little: false
        };

        var options = $.extend(defaults, opt);


        // functions lik this one is already in the little chessboard.
        this.setNumberMove = function (val) {
            numero_mossa = val;
        }
        this.setAnimation = function (val) {
            animation = val;
        }
        this.getAnimation = function () {
            return animation;
        }
        this.getEnd_flag = function () {
            return  flag_end ;
        }
        this.setEnd_flag = function () {
            flag_end=false ;
        }
        this.showConsole = function () {
            console.log('my_div',my_div);
            this.consolle() ;
        }
        // get x coordinates and store in  cb_x[i][y]
        // get y coordinates and store in  cb_y[i][y]
        // scale pieces in cb[i][y] to $("#da1").outerWidth();
        var coordinate = function () {
            var mycase = my_div + " .da1:eq(0)";
            var dim = $(mycase).outerWidth();

            var newSize = $.scaleSize(dim, dim, 50, 50);
            for (var i = 8; i > 0; i--) {
                for (var y = 1; y < 9; y++) {
                    if (cb[i][y].length > 0) {
                        var mypiece = my_div + " ." + cb[i][y];
                        //  $(my_div+" ." + cb[i][y]+":eq(0)").css({width: newSize[0] + "px", height: newSize[1] + "px"});
                        $(my_div + " ." + cb[i][y] + ":eq(0)").css("height", newSize[1] + "px");

                        $(my_div + " ." + cb[i][y] + ":eq(0)").css('width', newSize[0] + 'px');
                        var wPiece = $(mypiece + ":eq(0)").width();
                        var wCase = $(mycase).outerWidth();
                        var diff = (wCase - wPiece) / 2;
                    }
                    var coo = my_div + " .d" + get_column(y) + i + ":eq(0)";
                    var x1 = $(coo).position();

                    cb_x[i][y] = x1.left + diff;
                    cb_y[i][y] = x1.top + diff;
                }
            }
        };

        // @param little whether to create the little chessboard
        var create_board = function (little) {
            var htm2 = '';
            var columns = ['', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

            // create large chessboard
            if (!little) {
                for (i = 8; i > 0; i--) {//box
                    htm2 += "<div class='row'>";
                     htm2 += "";
                    for (var j = 1; j < 9; j++) {
                        if ((i + j) % 2 == 1) {
                            htm2 += "<div class='col-xs-1 col-sm-1 col-md-1 wh-chess-piece d" + columns[j] + "" + i + "'></div>";

                        } else {
                            htm2 += "<div class='col-xs-1 col-sm-1 col-md-1 bg-chess-piece d" + columns[j] + "" + i + "'></div>";

                        }
                    }
                     htm2 += "</div>";
                }
                 htm2 +="<div><span  class='b_on'> <img src='images/arrow-right.png'  alt=''></span><span  class='b_back'> <img src='images/arrow-left.png'  alt=''> </span></div>";

                // create little chessboard
            } else {
                case_width = 30; var yyy;var xxx;
                for (var i = 8; i > 0; i--) {//box
                    htm2 += "";

                    for (j = 1; j < 9; j++) {
                         yyy = (8 - i) * 30;
                         xxx = (j - 1) * 30;
                        if ((i + j) % 2 == 1) {
                            htm2 += "<div class='wh-chess-piece d" + columns[j] + "" + i + "' style='width: 30px;height: 30px;z-index:1;position:absolute;top:" + yyy + "px;left:" + xxx + "px'></div>";
                        } else {
                            htm2 += "<div class='bg-chess-piece d" + columns[j] + "" + i + "' style='width: 30px;height: 30px;z-index:1;position:absolute;top:" + yyy + "px;left:" + xxx + "px'></div>";
                        }
                    }

                    htm2 += "";
                }
                 yyy=8*30; xxx=9*30;
                htm2 +="<div style='width:100px;height: 50px;position:absolute;top:" + yyy + "px;left:0px'><span  class='b_on'> <img src='images/arrow-right.png'  alt=''></span><span  class='b_back'> <img src='images/arrow-left.png'  alt=''> </span></div>";

            }

            $(my_div).append(htm2);
             if (!little) {
                for (i = 8; i > 0; i--) {//box
                    for (var j = 1; j < 9; j++) {

                              $('.d' + columns[j] + "" + i +':eq(0)').on('click',clicksquare);
                            $('.d' + columns[j] + "" + i +':eq(0)').on('dragover',mydragover);
                            $('.d' + columns[j] + "" + i +':eq(0)').on('drop',mydrop);

                    }
                }
             }
        }

        var add_piece = function (elem, _id, gif) { // TODO: we can clone the element with jQuery $.clone() to get better performance
              var myelem = "<img src='scacchi/" + gif + "' class='centra_pezzi " + _id + "' style='position:absolute;z-index:200;display:none' >";

              $(my_div).append(myelem);
              if (!options.little) {
                      $('.'+_id+ ':eq(0)').attr("draggable", "true");
                      $('.'+_id+ ':eq(0)').on('dragstart',dragStart);
              };
        };
        /* SENZA DRAG
        var add_piece = function (elem, _id, gif) { // TODO: we can clone the element with jQuery $.clone() to get better performance
            var myelem = "<img src='scacchi/" + gif + "' class='centra_pezzi " + _id + "' style='position:absolute;z-index:200;display:none'>";
            $(my_div).append(myelem);
        };
        */
        var chessboard_piece = function () {
            //var count = $(".chess_container").children().length;
            //for ( i=0; i<count; i++)  {                    }
            //$('.chess_container').children().each(function(i,v){  });
            var i, y;
            for (var i = 8; i > 0; i--) {
                for (var y = 1; y < 9; y++) {
                    if (cb[i][y] != "") {
                        $(my_div + " ." + cb[i][y] + ":eq(0)").css({left: cb_x[i][y] + "px", top: cb_y[i][y] + "px"});
                    }
                }
            }
        };

        var create_piece = function () {
            add_piece(rqb, 'rqb', 'btor.gif');
            add_piece(rkb, 'rkb', 'btor.gif');
            add_piece(kqb, 'kqb', 'bcav.gif');
            add_piece(kkb, 'kkb', 'bcav.gif');
            add_piece(kk2b, 'kk2b', 'bcav.gif');
            add_piece(bqb, 'bqb', 'balf.gif');
            add_piece(bkb, 'bkb', 'balf.gif');
            add_piece(qb, 'qb', 'breg.gif');
            add_piece(q2b, 'q2b', 'breg.gif');
            add_piece(kb, 'kb', 'bree.gif');
            add_piece(p1b, 'p1b', 'bped.gif');
            add_piece(p2b, 'p2b', 'bped.gif');
            add_piece(p3b, 'p3b', 'bped.gif');
            add_piece(p4b, 'p4b', 'bped.gif');
            add_piece(p5b, 'p5b', 'bped.gif');
            add_piece(p6b, 'p6b', 'bped.gif');
            add_piece(p7b, 'p7b', 'bped.gif');
            add_piece(p8b, 'p8b', 'bped.gif');
            add_piece(rqn, 'rqn', 'ntor.gif');
            add_piece(rkn, 'rkn', 'ntor.gif');
            add_piece(kqn, 'kqn', 'ncav.gif');
            add_piece(kkn, 'kkn', 'ncav.gif');
            add_piece(kk2n, 'kk2n', 'ncav.gif');
            add_piece(bqn, 'bqn', 'nalf.gif');
            add_piece(bkn, 'bkn', 'nalf.gif');
            add_piece(qn, 'qn', 'nreg.gif');
            add_piece(q2n, 'q2n', 'nreg.gif');
            add_piece(kn, 'kn', 'nree.gif');
            add_piece(p1n, 'p1n', 'nped.gif');
            add_piece(p2n, 'p2n', 'nped.gif');
            add_piece(p3n, 'p3n', 'nped.gif');
            add_piece(p4n, 'p4n', 'nped.gif');
            add_piece(p5n, 'p5n', 'nped.gif');
            add_piece(p6n, 'p6n', 'nped.gif');
            add_piece(p7n, 'p7n', 'nped.gif');
            add_piece(p8b, 'p8n', 'nped.gif');

            chessboard_piece();
        };

        //Show and move pieces in the case corresponding to cb array at xposition (cb_x array)  and at yposition (cb_y array)
        var size_320 = function () {   // internal
            coordinate();
            var i, y;
            for (var i = 8; i > 0; i--) {
                for (var y = 1; y < 9; y++) {
                    if (cb[i][y] != "") {
                        $(my_div + " ." + cb[i][y] + ":eq(0)").show().css({
                            left: cb_x[i][y] + "px",
                            top: cb_y[i][y] + "px"
                        });
                    }
                }
            }
        };
         /*
        var move = function (str) { //_e2-e4



            var colStart = str.substr(1, 1);//e
            var rowStart = str.substr(2, 1);//2
            var colEnd = str.substr(4, 1);  //e
            var rowEnd = str.substr(5, 1);  //4
            var numColumn = columnToNumber(colStart);//e->5
            var piece = cb[rowStart][numColumn];    //cb[2][5]
            cb[rowStart][numColumn] = "";
            var numColumn2 = columnToNumber(colEnd); //d54
            if (cb[rowEnd][numColumn2] != "") {
               // console.info('to hide element: ' + my_div + " ." + cb[rowEnd][numColumn2] + ":eq(0)");
                $(my_div + " ." + cb[rowEnd][numColumn2] + ":eq(0)").hide();
                cb[rowEnd][numColumn2] = "";
            }
            cb[rowEnd][numColumn2] = piece;
            $(my_div + " ." + piece + ":eq(0)").css({
                left: cb_x[rowEnd][numColumn2] + "px",
                top: cb_y[rowEnd][numColumn2] + "px"
            });
            lancia();

        };
        */
        var clean_pieces = function () { //pulisci
             a_mosse_2pezzo = [];a_mosse = []; a_mosse_em = []; aaa_fentrans=[]; aaa_arrocco=[];
            numero_totale_mosse=0;numero_mossa=0;
            tutte_txt="";//viene chiamato da  parent con inizio nuova linea
            build_cb();
            t_AKB=true;t_AQB=true;t_AKN=true;t_AQN=true;
            var SA_tutti_i_pezzi = ["kk2b", "kk2n", "q2b", "q2n", "kn", "rkn", "rqn", "bkn", "bqn", "kqn", "kkn", "qn", "kb", "rkb", "rqb", "bkb", "bqb",
                "kqb", "kkb", "qb", "p1n", "p2n", "p3n", "p4n", "p5n", "p6n", "p7n", "p8n", "p1b", "p2b", "p3b", "p4b", "p5b", "p6b", "p7b", "p8b"];
            if (!flag_animation) {
                var i = 0, i2 = 0, y = 0; numero_mossa = 0;
                cb = build_cb();
                for (i = 0; i < SA_tutti_i_pezzi.length; i++) {
                    $(my_div + " ." + SA_tutti_i_pezzi[i] + ":eq(0)").hide();
                }
                var myrow  = 0;
                var i  = 8;var y  = 1;
                for (i = 8; i > 0; i--) {


                    for (y = 1; y < 9; y++) {
                        if (cb[i][y] != "") {

                            $(my_div + " ." + cb[i][y] + ":eq(0)").show().css({
                                left: cb_x[i][y] + "px",
                                top: cb_y[i][y] + "px"
                            }).show();
                        }

                    }
                }
            }
            lancia ();
        };




        //create outside chessboard border
        var border = function (myboard_white) {

            for (var i = 8; i > 0; i--) {
                for (var y = 1; y < 9; y++) {
                    var sele = my_div + " .d" + get_column(y) + i + ":eq(0)";
                    var tt = $(sele);
                    if ((i == 1 && board_white) || (i == 8 && !board_white)) {
                        tt.css({
                            "border-bottom-color": "#000",
                            "border-bottom-weight": "1px",
                            "border-bottom-style": "solid"
                        });
                    }
                    if ((i == 8 && board_white) || (i == 1 && !board_white)) {
                        tt.css({"border-top-color": "#000", "border-top-weight": "1px", "border-top-style": "solid"});
                    }
                    if ((y == 1 && board_white) || (y == 8 && !board_white)) {
                        tt.css({
                            "border-left-color": "#000",
                            "border-left-weight": "1px",
                            "border-left-style": "solid"
                        });
                    }
                    if ((y == 8 && board_white) || (y == 1 && !board_white)) {
                        tt.css({
                            "border-right-color": "#000",
                            "border-right-weight": "1px",
                            "border-right-style": "solid"
                        });
                    }
                }
            }

        };

        if (options.continua == 0) {//initcb(3 ,'_e2-e4', 1 )    //MOVE ONE PIECE by one
            my_div = "#" + options._div;
            this.ok_my_div = "#" + options._div;
            if (options.little) {
                $(my_div).css('height', '240px');
                $(my_div).css('width', '240px');
            } else {
                $(my_div).css('height', '400px');
                $(my_div).css('width', '400px');
            }

            create_board(options.little);
            a_mosse = [];
            cb = build_cb();
            cb_x = initArray(9);
            cb_y = initArray(9);
            //coordinate();
            create_piece();
            border(board_white);
            lancia();
            size_320();
            console.log('00000000000000');
            addDrag();
        }


        this.init_cb = function (mycontinua, mymossa, mynum_mossa_server, mytrans) {
            trimed_mossa = mymossa.trim();
            switch (mycontinua) {
                case 3: //initcb(3 ,'_e2-e4', 1 )    //MOVE ONE PIECE by one
                    a_mosse_2pezzo.push("");
		            a_mosse_em.push("");
                    a_mosse.push(trimed_mossa);
                    numero_mossa = mynum_mossa_server;
                    tutte(trimed_mossa, numero_mossa);
                    this.avanti(trimed_mossa);
                    return this;
                case 33: //initcb(3 ,'_e2-e4', 1 )    //MOVE ONE PIECE by one
                    clean_pieces();
                    a_mosse = trimed_mossa.split(" ");
                    numero_totale_mosse= a_mosse.length;
                    numero_mossa=0;

                    return this;
                case 1: //move many pieces _e2-e4 _e7-e5 _d2-d4 _e5xd4 Ng1_f3 Nb8_c6
                	  //  aaa_fentrans.splice(0)
		              flag_aspetta_che_termina=false;//roll tree main
                      clean_pieces();
                      if (!flag_animation) {
        		                      a_mosse = trimed_mossa.split(" ");
                                     var  aa_mosse=  a_mosse;
                        		      numero_mossa=0;
                        		     //numero_totale_mosse=a_mosse.length;
                                      numero_totale_mosse= a_mosse.length;
                        		     var flag_errore_indietro =true;

                        		    if (!animation) {
                                            var i = 0;
                                            flag_end  = false;
                              		        for (i = 0; i<numero_totale_mosse; i++) {
                              			           numero_mossa+=1
                              			          a_mosse_2pezzo[i]="";
                              			          a_mosse_em[i]="";
                              			          this.avanti(a_mosse[numero_mossa-1])
                              		              //	aaa_fentrans[i]=fentrans
                                                  if (numero_mossa==( numero_totale_mosse-1)) {
                                                        flag_end  = true;
                                                        flag_aspetta_che_termina=true;
                                                        return this;
                                                  }
                                              }
                                  } else {

                                            flag_animation = true;

                                            //  that.customInterval(   ) ;
                                            /*
                                             varInterval = setInterval(function () {

                                                      if (numero_mossa < numero_totale_mosse) {

                                        			        a_mosse_2pezzo[numero_mossa]="";
                                        			        a_mosse_em[numero_mossa]="";
                                                            numero_mossa += 1;
                                                            avanti(   a_mosse[numero_mossa - 1]);
                                                      } else {
                                                          flag_animation = false;
                                                          clearInterval(varInterval); flag_aspetta_che_termina=true;
                                                          return this;
                                                      }

                                            }, 100);
                                            */
                                           // varInterval = setInterval( function () {   that.customInterval(   ) ;}, 100);
                                            varInterval = setInterval($.proxy(that.customInterval, that), 10 );
                             }
                    }

                     // I think the $.proxy() could solve the problem well. it proxy the context in setInterval to the object that.
                     // is that right? o.k.

                    case 0:
                        clean_pieces();
                    return this;
                case 11: // resize
                    console.log('resize');
                    size_320();
                    return this;
                default:
                    console.info('invalid value for mycontinua as param of init_cb');
                    break;
            }
        };
        var tutte = function(mosse ,num_mossa){   //add mossa to tutte_txt
                        var trimMossa= mosse.trim();
                 		var mytutte =tutte_txt;
                		if (num_mossa>1) {mytutte+=" "+trimMossa;} else {mytutte+=trimMossa;}
                		this.tutte_txt=mytutte;
                }
        var varInterval;

        this.customInterval = function (   )
        //function customInterval()
        {      //i have problem with scope variables

                  if (numero_mossa < numero_totale_mosse) {

                a_mosse_2pezzo[numero_mossa]="";

                a_mosse_em[numero_mossa]="";
                        numero_mossa += 1;
                        //can i call a private method plugin?

                        this.avanti(a_mosse[numero_mossa - 1]);
                  } else {
                      flag_animation = false;
                      clearInterval(varInterval); flag_aspetta_che_termina=true;
                      //return this;
                  }
        }

        function lancia(){
        		build_acb ();
        		flag_avanti=1;//VIP se viene premuto troppo velocemente da avanti
        	    flag_indietro=1;

                fen('lancia',that) ;

        }
        function build_acb () {
        	acb = [];	acb_c = [];
        	var i2= 1;
        	var j2;
        	var myrow2;
        	while (i2 <9){
        			myrow2=9-i2;
        			j2 = 1;
        			while (j2 < 9){
        				if (cb[myrow2][j2].length>0 ){
        						acb.push(cb[myrow2][j2]);
        						acb_c.push("d"+coo_y (j2)+""+myrow2);
        				 }
        				 j2++;
        			}
        			i2++;
        	}
        }
        function oo_false (pezzoMangiato) {
        							if (pezzoMangiato=="rkn") {t_AKN=false;}
        							if (pezzoMangiato=="rqn") {t_AQN=false;}
        							if (pezzoMangiato=="rkb") {t_AKB=false;}
        							if (pezzoMangiato=="rqb") {t_AQB=false;}

        }

        $(my_div + " .b_on:eq(0)").click(function(){
        	if ( numero_mossa <  numero_totale_mosse ) {
        	  if (numero_mossa>0) {

                    //for ( i5=0; i5<a_mosse_2pezzo.length; i++){console.log(numero_mossa,'tarrocco->',i5,a_mosse_2pezzo[i5]);}
                    a_mosse_2pezzo.splice(numero_mossa );
                    a_mosse_em.splice(numero_mossa );
                    aaa_fentrans.splice(numero_mossa );
                    aaa_arrocco.splice(numero_mossa );
                    console.log('_dopo_numero_mossa',numero_mossa,'a_mosse_2pezzo.length',a_mosse_2pezzo.length);
                    //for ( i5=0; i5<a_mosse_2pezzo.length; i++){console.log(numero_mossa,'tarrocco->',i5,a_mosse_2pezzo[i5]);}
                    t_AKB=aaa_arrocco[numero_mossa-1][0];
                    t_AQB=aaa_arrocco[numero_mossa-1][1];
                    t_AKN=aaa_arrocco[numero_mossa-1][2];
                    t_AQN=aaa_arrocco[numero_mossa-1][3];
                      //console.log('arrocco_precedente->',i,aaa_arrocco[numero_mossa-1],aaa_arrocco[numero_mossa-1][0],aaa_arrocco[numero_mossa-1][1],aaa_arrocco[numero_mossa-1][2],aaa_arrocco[numero_mossa-1][3]  )
                      /*
                                  console.log('pre',aaa_fentrans.length);
                    for (var i=0; i<aaa_fentrans.length; i++)  {
                          console.log('a_mosse_2pezzo',i,a_mosse_2pezzo[0],a_mosse_2pezzo.length,a_mosse_2pezzo );
                          console.log('a_mosse_em',i,a_mosse_em[0],a_mosse_em.length,a_mosse_em );
                      }
                      */
              }
          	  a_mosse_2pezzo[numero_mossa]="";
              a_mosse_em[numero_mossa]="";
            	    numero_mossa+=1;
            		that.avanti( a_mosse[ numero_mossa-1]);
                    tutte( a_mosse[ numero_mossa-1], numero_mossa);
                    aaa_fentrans[numero_mossa-1]=that.fentrans;
                    aaa_arrocco[numero_mossa-1]=[t_AKB,t_AQB,t_AKN,t_AQN];

                    for (var i=0; i<aaa_fentrans.length; i++)  {

                      }

        } else {
               	console.log('   ultima mossa_________________       ');
        }
        });
        $(my_div + " .b_back:eq(0)").click(function(){
            console.log('indietro-Z','numero_mossa',numero_mossa,'a_mosse_2pezzo.length',a_mosse_2pezzo.length);
        	if ( numero_mossa>=1  ) {
        		    numero_mossa-=1;
        	        that.indietro( a_mosse[ numero_mossa]);
        	}
        });
        this.avanti= function (mossa )  {
          // function avanti(mossa )  {
        	//	f_empassant (numero_mossa,mossa)

        	var Colonne_Num =['x','a','b','c','d','e','f','g','h'];
        	var flag_empassant =false;
        	var scaccoMatto_Promozione =mossa.substr(3,1);
        	if (scaccoMatto_Promozione!="x" && scaccoMatto_Promozione!="-" && scaccoMatto_Promozione!="0"  && scaccoMatto_Promozione!="q"  && scaccoMatto_Promozione!="n" && scaccoMatto_Promozione!="Q"  && scaccoMatto_Promozione!="N"){
        		flag_empassant=true;
        	}
        	if ( mossa.substr(0,1)=="_") {
        			if ( mossa.substr(2,1)=="7" &&  mossa.substr(5,1)=="8") {
        				if (scaccoMatto_Promozione!="q"  && scaccoMatto_Promozione!="n" && scaccoMatto_Promozione!="Q"  && scaccoMatto_Promozione!="N"){
        					scaccoMatto_Promozione="Q" ;
        				}
        			}
        			if ( mossa.substr(2,1)=="2" &&  mossa.substr(5,1)=="1") {
        					scaccoMatto_Promozione="Q" ;
        			}
        	}
        	if (numero_mossa<numero_totale_mosse) {f_LastMossa=1;}
        	if (numero_mossa==numero_totale_mosse) {f_LastMossa=0;}
        	if (flag_avanti==1) {

        		    flag_avanti+=1//VIP se viene premuto troppo velocemente
        			if (mossa=="_0-0-0" ) {
        					if (numero_mossa%2==1) {t_AKB=false;t_AQB=false;
            						 //pa.kb.x = pa.dc1.x; pa.rqb.x = pa.dd1.x;
                                     //move(1,5,1,3);
                                     move ("",1,5,1,3 );//kb,
                                     move ("",1,1,1,4 );//rqb
                                     //move(1,1,1,4);
                                     cb[1][1]="";cb[1][5]="";cb[1][4]="rqb";cb[1][3]="kb";
        					}
        					if (numero_mossa%2==0) {t_AKN=false;t_AQN=false;
            						//pa.kn.x = pa.dc8.x;pa.rqn.x = pa.dd8.x;
                                    move ("",8,5,8,4 );//kn
                                    move ("",8,1,8,3 );//rqn
                                    cb[8][1]="";cb[8][5]="";			cb[8][4]="rqn";cb[8][3]="kn";
        					}
        					lancia();
        					return true;
        			}else if (mossa=="___0-0"  ) {
        					if (numero_mossa%2==1) {t_AKB=false;	t_AQB=false;
            						//pa.kb.x = pa.dg1.x;pa.rkb.x = pa.df1.x;
                                    move ("",1,5,1,7 );//kb
                                    move ("",1,8,1,6 );//rkb
                                    cb[1][8]="";cb[1][5]="";			cb[1][6]="rkb";cb[1][7]="kb";
        					}
        					if (numero_mossa%2==0) {t_AKN=false;				t_AQN=false;
        						//pa.kn.x = pa.dg8.x;pa.rkn.x = pa.df8.x;
                                move ("",8,5,8,7 );//kn
                                move ("",8,8,8,6 );//rkn
                                cb[8][5]="";cb[8][7]="kn";
                                cb[8][8]="";cb[8][6]="rkn";
        					}
        					lancia();
        					return true;
        			 } else{
        					var colonna_inizio =mossa.substr(1,1);//"d"+colonna_inizio+riga_inizio)
        					var colonna_fine =mossa.substr(-2,1);//"d"+colonna_fine+riga_fine
        					var colonna_inizio_Num =Colonne_Num.indexOf(mossa.substr(1,1)); //cb[.][8]
        					var colonna_fine_Num =Colonne_Num.indexOf(mossa.substr(-2,1)); //cb[.][8]
        					var riga_inizio =mossa.substr(2,1);
        					var riga_inizio_Num =Number(riga_inizio);  //cb[2][.]
        					var riga_fine =mossa.substr(-1);
        					var riga_fine_Num =Number(riga_fine);//cb[2][.]
                     		var pedina ;
        					var len =acb_c.length;

        					for (var i =0;i<len;i++) {
        							//if (acb_c[i]==("d"+mossa.substr(1,1)+inizio2)) {pedina=acb[i];}
        							if (acb_c[i]==("d"+colonna_inizio+riga_inizio)) {pedina=acb[i];}
        							if (acb_c[i]==("d"+colonna_fine+riga_fine)) {a_mosse_2pezzo[numero_mossa-1]=acb[i];}
        							//di lato senza queste aggiunte mangia tutti i pezzi
        					}

        					if (pedina.length>0) {
        						if (flag_empassant) {
        							var colonna_empassant = Colonne_Num.indexOf(scaccoMatto_Promozione);
        							if (numero_mossa%2==1) {
        									//pa[cb[5][colonna_fine_Num]].x=2000;
                                            move("",5,colonna_fine_Num,0,0);
                                            move("",5,colonna_inizio_Num,6,colonna_fine_Num);
        								    cb[5][colonna_fine_Num]="";
        									cb[5][colonna_inizio_Num]="";
        									cb[6][colonna_fine_Num]=pedina;
        							 }
        							if (numero_mossa%2==0) {
        							 	   //pa[cb[4][colonna_fine_Num]].x=2000;
                                            move("",4,colonna_fine_Num,0,0);
                                            move("",4,colonna_inizio_Num,3,colonna_fine_Num);
        								    cb[4][colonna_fine_Num]="";
        									cb[4][colonna_inizio_Num]="";
        									cb[3][colonna_fine_Num]=pedina;
        							}
        							for ( i =0;i<len;i++) {
        								if (acb_c[i]==("d"+scaccoMatto_Promozione+riga_inizio)) {
        										 a_mosse_2pezzo[numero_mossa-1]=acb[i];
        										 a_mosse_em[numero_mossa-1]="d"+scaccoMatto_Promozione+riga_inizio;
        								}
        							}

        							//pa[pedina].x = pa["d"+colonna_fine+riga_fine].x;
        							//pa[pedina].y = pa["d"+colonna_fine+riga_fine].y;

        						    lancia();
        							return true;
        						}
        						var pezzoMangiato="";

        						if ((scaccoMatto_Promozione=="Q"  || scaccoMatto_Promozione=="q") && numero_mossa%2==0) {

        								 	if (a_mosse_2pezzo[numero_mossa-1].length>0) {
        										pezzoMangiato=a_mosse_2pezzo[numero_mossa-1];
        										//pa[pezzoMangiato].x =-2000
                                                                      //yesmove(true,pezzoMangiato,mossa,0,0,0,0)
                                                move("",riga_fine_Num,colonna_fine_Num,0,0);
        									}
        									//pa[pedina].x = -2000;
                                            move("",riga_inizio_Num,colonna_inizio_Num,0,0);
                                                              // yesmove(true,pedina,mossa,0,0,0,0)
        									//pa["q2n"].addEventListener(MouseEvent.MOUSE_DOWN,fdown);
        									//pa["q2n"].addEventListener(MouseEvent.MOUSE_UP,fup)
        									//pa["q2n"].x = pa["d"+colonna_fine+riga_fine].x;
        									//pa["q2n"].y = pa["d"+colonna_fine+riga_fine].y;
                                                                // yesmove(false,"q2n",mossa,0,0,0,0)
                                            move("q2n", riga_inizio_Num,colonna_inizio_Num, riga_fine_Num,colonna_fine_Num);
        									cb[riga_fine_Num][colonna_fine_Num]="q2n";
        									cb[riga_inizio_Num][colonna_inizio_Num]="";
        									 a_mosse_em[numero_mossa-1]=pedina;
        									oo_false(pezzoMangiato) ;



        								   lancia() ;
        									return true;
        						}
        						if ((scaccoMatto_Promozione=="Q"  || scaccoMatto_Promozione=="q") && numero_mossa%2==1) {
        								    if (a_mosse_2pezzo[numero_mossa-1].length>0) {
        											pezzoMangiato=a_mosse_2pezzo[numero_mossa-1];
                                                    //yesmove(true,pezzoMangiato,mossa,0,0,0,0)
                                                     move(riga_fine_Num,colonna_fine_Num,0,0);
        											//pa[pezzoMangiato].x =-2000
        									}
        									//pa[pedina].x = -2000;
                                            move("",riga_inizio_Num,colonna_inizio_Num,0,0);
        									//pa["q2b"].addEventListener(MouseEvent.MOUSE_DOWN,fdown);
        									//pa["q2b"].addEventListener(MouseEvent.MOUSE_UP,fup)
        									//pa["q2b"].x = pa["d"+colonna_fine+riga_fine].x;
        									//pa["q2b"].y = pa["d"+colonna_fine+riga_fine].y;
                                           move("q2b", riga_inizio_Num,colonna_inizio_Num, riga_fine_Num,colonna_fine_Num);
        									cb[riga_fine_Num][colonna_fine_Num]="q2b";
        									cb[riga_inizio_Num][colonna_inizio_Num]="";
        									 a_mosse_em[numero_mossa-1]=pedina;
        									oo_false(pezzoMangiato);
        									lancia();
        									return true;
        						}

        						if ((scaccoMatto_Promozione=="N"  || scaccoMatto_Promozione=="n") && numero_mossa%2==0) {

        								 	if (a_mosse_2pezzo[numero_mossa-1].length>0) {
        										pezzoMangiato=a_mosse_2pezzo[numero_mossa-1];
        										//pa[pezzoMangiato].x =-2000
                                                move(riga_fine_Num,colonna_fine_Num,0,0);
        									}
        									//pa[pedina].x = -2000;
                                           move("",riga_inizio_Num,colonna_inizio_Num,0,0);
                                            move("kk2n", riga_inizio_Num,colonna_inizio_Num, riga_fine_Num,colonna_fine_Num);
        									cb[riga_fine_Num][colonna_fine_Num]="kk2n";
        									cb[riga_inizio_Num][colonna_inizio_Num]="";
        									a_mosse_em[numero_mossa-1]=pedina;
        									oo_false(pezzoMangiato);

        									lancia();
        									return true;
        						}
        						if ((scaccoMatto_Promozione=="N"  || scaccoMatto_Promozione=="n") && numero_mossa%2==1) {
        								    if (a_mosse_2pezzo[numero_mossa-1].length>0) {
        											pezzoMangiato=a_mosse_2pezzo[numero_mossa-1];
        											//pa[pezzoMangiato].x =-2000
                                                    move(riga_fine_Num,colonna_fine_Num,0,0);
        									}
        									//pa[pedina].x = -2000;
                                            move("",riga_inizio_Num,colonna_inizio_Num,0,0);
                                            move("kk2b", riga_inizio_Num,colonna_inizio_Num, riga_fine_Num,colonna_fine_Num);
        									cb[riga_fine_Num][colonna_fine_Num]="kk2b";
        									cb[riga_inizio_Num][colonna_inizio_Num]="";
        									a_mosse_em[numero_mossa-1]=pedina;
        									oo_false(pezzoMangiato);
        									lancia();
        									return true;
        						    }


        							if ( a_mosse_2pezzo[numero_mossa-1].length>0) {
        									pezzoMangiato= a_mosse_2pezzo[numero_mossa-1];
        							}
         							if (pedina=="kn") {t_AKN=false;t_AQN=false;}
        							if (pedina=="kb") {t_AKB=false;t_AQB=false;}
        							if (pedina=="rkn") {t_AKN=false;}
        							if (pedina=="rqn") {t_AQN=false;}
        							if (pedina=="rkb") {t_AKB=false;}
        							if (pedina=="rqb") {t_AQB=false;}
        							oo_false(pezzoMangiato)

        							if (pezzoMangiato.length>0) {

                                         move("",riga_fine_Num,colonna_fine_Num,0,0);
                                          cb[riga_fine_Num][colonna_fine_Num]="";

                                    }
                                  //  movePiece  (pedina,"d"+colonna_inizio+riga_inizio,"d"+colonna_fine+riga_fine);
                                    move("",riga_inizio_Num,colonna_inizio_Num,riga_fine_Num,colonna_fine_Num );

        							cb[riga_inizio_Num][colonna_inizio_Num]="";
        							cb[riga_fine_Num][colonna_fine_Num]=pedina;

                              //   console.log('________...',pedina,mossa,"d"+colonna_inizio+riga_inizio,"d"+colonna_fine+riga_fine);
                                    /*
        							if (!training && abilita_tween && no_tween) {
        								if (!muovi_no) {
        									 muovi_tween(pa[pedina],pa[pedina].x,pa["d"+colonna_fine+riga_fine].x,pa[pedina].y,pa["d"+colonna_fine+riga_fine].y)
        								}
                                     } else {
        								if (!muovi_no) {
                                        */
        								   //pa[pedina].x = pa["d"+colonna_fine+riga_fine].x;
        									//pa[pedina].y = pa["d"+colonna_fine+riga_fine].y;
                                            /*
        								}
        							}
                                    */

        					};//pedina
        					lancia()
         					return true;
        				};////fine else
        				return false;
        		} else {return false;}//if flag_avanti==1
        }
        this.indietro=function (mossa ) {
          console.log('indietro',mossa);
        		var Colonne_Num=['x','a','b','c','d','e','f','g','h'];
        		if (numero_mossa<numero_totale_mosse) {f_LastMossa=1;}//vedi initcb
        		if (numero_mossa==numero_totale_mosse) {f_LastMossa=0;}
        		if (flag_indietro==1) {flag_indietro+=1
        				var scaccoMatto_Promozione =mossa.substr(3,1);
        				if (mossa=="_0-0-0" ) {
        					if ((numero_mossa+1)%2==1) {
        					    move("",1,3,1,5);
                                move("",1,4,1,1);
        					  //  pa.rqb.x = pa.da1.x;pa.kb.x = pa.de1.x;
                              cb[1][1]="rqb";cb[1][5]="kb";cb[1][3]="";cb[1][4]="";
                              }
        					if ((numero_mossa+1)%2==0) {
        					    //pa.rqn.x = pa.da8.x;pa.kn.x = pa.de8.x;
                                move("",8,4,8,5);
                                move("",8,3,8,1);
                                cb[8][1]="rqn";cb[8][5]="kn";cb[8][3]="";cb[8][4]="";
                              }
        				 }
        				else if (mossa=="___0-0" ) {
        					if ((numero_mossa+1)%2==1) {
                                move("",1,7,1,5);
                                move("",1,6,1,8);
        					  //pa.rkb.x = pa.dh1.x;pa.kb.x = pa.de1.x;
                              cb[1][8]="rkb";cb[1][5]="kb";cb[1][6]="";cb[1][7]="";
                              }
        					if ((numero_mossa+1)%2==0) {
        					  //pa.rkn.x = pa.dh8.x;pa.kn.x = pa.de8.x;
                              // yesmove (false,"kn","",8,7,8,5 );
                              //yesmove (false,"rkn","",8,8,8,7 );
                               move("",8,7,8,5);cb[8][5]="";cb[8][7]="kn";
                                move("",8,6,8,8);cb[8][8]="";cb[8][6]="rkn";
                              // cb[8][8]="rkn";cb[8][5]="kn";cb[8][6]="";cb[8][7]="";
                              }

        				} else{
        						var colonna_inizio =mossa.substr(1,1)
        						var colonna_fine =mossa.substr(-2,1)
        						var colonna_inizio_Num =Colonne_Num.indexOf(mossa.substr(1,1))
        						var colonna_fine_Num =Colonne_Num.indexOf(mossa.substr(-2,1))
        						var riga_inizio =mossa.substr(2,1)
        						var riga_inizio_Num =Number(riga_inizio)
        						var riga_fine =mossa.substr(-1)
        						var riga_fine_Num =Number(riga_fine)
        						var inizio1 =Number(cambia(mossa.substr(1,1)));
        						var inizio2 =Number(mossa.substr(2,1));
        						var fine1 =Number(cambia(mossa.substr(-2,1)));
        						var fine2  =Number(mossa.substr(-1));
        						var pedina ;
        						var len =acb_c.length;
        						for (var i =0;i<len;i++) {
        							if (acb_c[i]==("d"+mossa.substr(-2,1)+fine2)) {pedina=acb[i];}
        							if (acb_c[i]==("d"+mossa.substr(-2,1)+fine2)) {pedina=acb[i];}
        						}

        						var flagPromozione =true
        						if (pedina.length>0) {

        								if ((scaccoMatto_Promozione=="Q" || scaccoMatto_Promozione=="q")  && (numero_mossa)%2==1){
        										//pa["q2n"].x = 2000;
                                                move("q2n",riga_fine_Num,colonna_fine_Num,0,0);
                                                pedina=a_mosse_em[numero_mossa];
                                                move(pedina,riga_fine_Num,colonna_fine_Num,riga_inizio_Num,colonna_inizio_Num);
                                                  console.log('in________,,,,,,_');
        										//pa[pedina].x = pa["d"+mossa.substr(1,1)+inizio2].x;
        										 //pa[pedina].y = pa["d"+mossa.substr(1,1)+inizio2].y;
        										 cb[inizio2][inizio1]=a_mosse_em[numero_mossa];
        										 cb[fine2][fine1]="";
        										if (a_mosse_2pezzo[numero_mossa].length>0) {
        					  					var pezzoMangiato =a_mosse_2pezzo[numero_mossa];
                                                     move(pezzoMangiato,riga_inizio_Num,colonna_inizio_Num,riga_fine_Num,colonna_fine_Num);
        											//pa[pezzoMangiato].x =pa["d"+mossa.substr(-2,1)+fine2].x;
        											 cb[fine2][fine1]=pezzoMangiato;
        										}
        										flagPromozione=false
        								  }
        								if ((scaccoMatto_Promozione=="Q" || scaccoMatto_Promozione=="q")  && (numero_mossa)%2==0){
        										//pa["q2b"].x = 2000;
                                                console.log('in________,,,,,,_',pedina);
                                                move("q2b",riga_fine_Num,colonna_fine_Num,0,0);
        										pedina=a_mosse_em[numero_mossa];
                                                move(pedina,riga_fine_Num,colonna_fine_Num,riga_inizio_Num,colonna_inizio_Num);
        									    //	pa[pedina].x = pa["d"+mossa.substr(1,1)+inizio2].x;
        										 //pa[pedina].y = pa["d"+mossa.substr(1,1)+inizio2].y;
        										 cb[inizio2][inizio1]=a_mosse_em[numero_mossa];
        										 cb[fine2][fine1]="";
        										if (a_mosse_2pezzo[numero_mossa].length>0) {

        											var pezzoEaten =a_mosse_2pezzo[numero_mossa];
          										//pa[pezzoEaten].x =pa["d"+mossa.substr(-2,1)+fine2].x;
                                                    // move(pezzoEaten,riga_inizio_Num,colonna_inizio_Num,riga_fine_Num,colonna_fine_Num);
                                                     move(pezzoEaten,riga_inizio_Num,colonna_inizio_Num,riga_fine_Num,colonna_fine_Num);
        											 cb[fine2][fine1]=pezzoEaten;
        										}
        										flagPromozione=false
        								}

        								if ((scaccoMatto_Promozione=="N" || scaccoMatto_Promozione=="n")  && (numero_mossa)%2==1){
        										//pa["kk2n"].x = 2000;
                                                 move("kk2n",riga_fine_Num,colonna_fine_Num,0,0);
        															pedina=a_mosse_em[numero_mossa]
        									   //	pa[pedina].x = pa["d"+mossa.substr(1,1)+inizio2].x;
        										 //pa[pedina].y = pa["d"+mossa.substr(1,1)+inizio2].y;
                                                 move(pedina,riga_fine_Num,colonna_fine_Num,riga_inizio_Num,colonna_inizio_Num);
        										 cb[inizio2][inizio1]=a_mosse_em[numero_mossa];
        										 cb[fine2][fine1]="";
        										if (a_mosse_2pezzo[numero_mossa].length>0) {
        											var pezzoMangiato6 =a_mosse_2pezzo[numero_mossa];
                                                    move(pezzoEaten6,riga_inizio_Num,colonna_inizio_Num,riga_fine_Num,colonna_fine_Num);
        											//pa[pezzoMangiato6].x =pa["d"+mossa.substr(-2,1)+fine2].x;
                                                    move(pezzoEaten6,riga_inizio_Num,colonna_inizio_Num,riga_fine_Num,colonna_fine_Num);
        											  cb[fine2][fine1]=pezzoMangiato6;
        										}
        										flagPromozione=false
        								  }
        								if ((scaccoMatto_Promozione=="N" || scaccoMatto_Promozione=="n")  && (numero_mossa)%2==0){
        										//pa["kk2b"].x = 2000;
                                                 move("kk2b",riga_fine_Num,colonna_fine_Num,0,0);
        										pedina=a_mosse_em[numero_mossa]
        										//pa[pedina].x = pa["d"+mossa.substr(1,1)+inizio2].x;
        										//pa[pedina].y = pa["d"+mossa.substr(1,1)+inizio2].y;
                                                move("kk2b",riga_fine_Num,colonna_fine_Num,riga_inizio_Num,colonna_inizio_Num);
        										cb[inizio2][inizio1]=a_mosse_em[numero_mossa];
        										cb[fine2][fine1]="";
        										if (a_mosse_2pezzo[numero_mossa].length>0) {
        												var pezzoEaten6 =a_mosse_2pezzo[numero_mossa];
                                                        move(pezzoEaten6,riga_inizio_Num,colonna_inizio_Num,riga_fine_Num,colonna_fine_Num);
        												//pa[pezzoEaten6].x =pa["d"+mossa.substr(-2,1)+fine2].x;
        												cb[fine2][fine1]=pezzoEaten6;
        										}
        										flagPromozione=false
        								  }


        								if (flagPromozione) {
        								  var caseEnd="d"+mossa.substr(1,1)+inizio2;
                                                console.log('_________',riga_fine_Num,colonna_fine_Num,riga_inizio_Num,colonna_inizio_Num);
                                               // move(inizio2,inizio1 ,fine2,fine1,fine2,fine1 ); //_e6xd5
                                                move("",riga_fine_Num,colonna_fine_Num,riga_inizio_Num,colonna_inizio_Num);
        										//pa[pedina].x = pa["d"+mossa.substr(1,1)+inizio2].x;
        										//pa[pedina].y = pa["d"+mossa.substr(1,1)+inizio2].y;
        										cb[inizio2][inizio1]=pedina;
        										cb[fine2][fine1]="";
        										if (a_mosse_2pezzo[numero_mossa].length>0) {
        												var pezzoEaten2 =a_mosse_2pezzo[numero_mossa];
        												if (a_mosse_em[numero_mossa].length>0) {
        														var em =a_mosse_em[numero_mossa];
        														var myColonna =Colonne_Num.indexOf(em.substr(1,1));
        														var myRiga =Number(em.substr(-1));
                                                                 console.log('_________',em,pezzoEaten2,em,riga_fine_Num,colonna_fine_Num,riga_inizio_Num,colonna_inizio_Num);

         														//pa[pezzoEaten2].x =pa[a_mosse_em[numero_mossa]].x;
                                                                $(my_div + " ." + pezzoEaten2+ ":eq(0)").show();
                                                                $(my_div + " ." + pezzoEaten2 + ":eq(0)").css({
                                                                    left: cb_x[myRiga][myColonna] + "px",
                                                                    top: cb_y[myRiga][myColonna] + "px"
                                                                });
        														cb[myRiga][myColonna]=pezzoEaten2;
        												} else {
        												        console.log('_______2',pezzoEaten2);
                                                                $(my_div + " ." + pezzoEaten2+ ":eq(0)").show();
                                                                $(my_div + " ." + pezzoEaten2 + ":eq(0)").css({
                                                                    left: cb_x[fine2][fine1] + "px",
                                                                    top: cb_y[fine2][fine1] + "px"
                                                                });
        														//pa[pezzoEaten2].x =pa["d"+mossa.substr(-2,1)+fine2].x;
        														cb[fine2][fine1]=pezzoEaten2;
        												 }
        										}
        								}
        						}//PEDINA
        				}//ELSE
        				lancia()
        		}
        }
        var move = function (vpiece,rowStart,columnStart,rowEnd,columnEnd) { //_e2-e4
                    var mypiece = cb[rowStart][columnStart];    //cb[2][5]
                    if (vpiece.length) {
                           mypiece =vpiece;
                    }
                    console.log('move',mypiece,rowEnd,columnEnd);
                    if (rowEnd == 0) {
                        $(my_div + " ." + mypiece + ":eq(0)").hide();
                        $(my_div + " ." + mypiece + ":eq(0)").css({
                            left: -2000 + "px",
                            top: -2000 + "px"
                        });
                    } else {
                      $(my_div + " ." + mypiece + ":eq(0)").show();
                        $(my_div + " ." + mypiece + ":eq(0)").css({
                            left: cb_x[rowEnd][columnEnd] + "px",
                            top: cb_y[rowEnd][columnEnd] + "px"
                        });
                    }
        };
        var movePiece = function (mypiece,mycase,mycase2 ) { //_e2-e4
                    var i, y;
                    for (var i = 8; i > 0; i--) {
                        for (var y = 1; y < 9; y++) {
                            if (cb[i][y] != "") {
                              if (cb[i][y]==mypiece) {                       }
                              $(my_div + " ." + cb[i][y] + ":eq(0)").show().css({left: cb_x[i][y] + "px",top: cb_y[i][y] + "px"});
                            }
                        }
                    }
        };
        var yesmove = function (zflag,zpedina,zmossa,_cb10,_cb01,_cb20,_cb02 ) { //_e2-e4

            //cb[riga_inizio_Num][colonna_inizio_Num]="";
        	  //cb[riga_fine_Num][colonna_fine_Num]=pedina;

                    	var Colonne_Num2 =['x','a','b','c','d','e','f','g','h'];
        					var zcolonna_inizio =zmossa.substr(1,1);//"d"+colonna_inizio+riga_inizio)
        					var zcolonna_fine= zmossa.substr(-2,1);//"d"+colonna_fine+riga_fine
        					var zcolonna_inizio_Num =Colonne_Num2.indexOf(zmossa.substr(1,1)); //cb[.][8]
        					var zcolonna_fine_Num =Colonne_Num2.indexOf(zmossa.substr(-2,1)); //cb[.][8]
        					var zriga_inizio =zmossa.substr(2,1);
        					var zriga_inizio_Num =Number(zriga_inizio);  //cb[2][.]
        					var zriga_fine =zmossa.substr(-1);
        					var zriga_fine_Num =Number(zriga_fine);//cb[2][.]
                    if (zflag) {
                        $(my_div + " ." + zpedina + ":eq(0)").hide();
                        $(my_div + " ." + zpedina+ ":eq(0)").css({
                            left: -2000 + "px",
                            top: -2000 + "px"
                        });
                    } else {
                      if (_cb10>0) {
                        $(my_div + " ." + zpedina+ ":eq(0)").css({
                            left: cb_x[_cb20][_cb02 ] + "px",
                            top: cb_y[_cb20][_cb02 ] + "px"
                        });
                        cb[_cb10][_cb01]="";cb[_cb20][_cb02]=zpedina;
                      } else {
                         $(my_div + " ." + zpedina+ ":eq(0)").css({
                            left: cb_x[zriga_fine_Num][zcolonna_fine_Num] + "px",
                            top: cb_y[zriga_fine_Num][zcolonna_fine_Num] + "px"
                        });
                        cb[zriga_inizio_Num][zcolonna_inizio_Num]="";cb[zriga_fine_Num][zcolonna_fine_Num]=zpedina;
                      }

                    }
        };
        function cambia (co  )  {
            if (co=='a') {return '1';}if (co=='b') {return '2';}
            if (co=='c') {return '3';}if (co=='d') {return '4';}
        	if (co=='e') {return '5';}if (co=='f') {return '6';}
        	if (co=='g') {return '7';}if (co=='h') {return '8';}return '0';
        }
        this.consolle = function() {
            console.log(cb[1]);console.log(cb[2]);console.log(cb[3]);console.log(cb[4]);console.log(cb[5]);console.log(cb[6]);console.log(cb[7]);console.log(cb[8]);
                 console.log('a_mosse_2pezzo', a_mosse_2pezzo[0],a_mosse_2pezzo.length,a_mosse_2pezzo );
                          console.log('a_mosse_em', a_mosse_em[0],a_mosse_em.length,a_mosse_em );
        }
        function fen (chi,obj) {

            var _fentrans ="";
         	myfen="";//azzera
        	var contat=0;
        	var i, myfen_interno="", myfen_1="", myfen_interno2="",Smyadd="";myadd=0,cb__="";
        	for (i=8;i>0;i--) {
        		for (var j =1;j<9;j++) {
        			cb__=cb[i][j];

        			if (cb__=="q2n") {cb__="qn";}
        			if (cb__=="q2b") {cb__="qb";}
        			if (cb__=="kqn") {cb__="nqn";}
        			if (cb__=="kk2b"){cb__="nqb";}
        			if (cb__=="kkn") {cb__="nkn";}
        			if (cb__=="kk2n"){cb__="nkn";}
        			if (cb__=="kqb") {cb__="nqb";}
        			if (cb__=="kkb") {cb__="nqb";}
        			if (cb__.substr(-1)=="n") {myfen_interno+=cb__.substr(0,1);}
        			if (cb__.substr(-1)=="b") {myfen_interno+=cb__.substr(0,1).toUpperCase();}
        			if (cb__.length==0) {myfen_interno+="1";}
        		}
        		for (var i2=0;i2<9;i2++) {
        			if (myfen_interno.substr(i2,1)=="1") {_fentrans+="1";	myadd+=1;
        			}else{
        				if (myadd==0) {Smyadd=""}else{Smyadd=""+myadd}
        				myfen_interno2+=Smyadd+myfen_interno.substr(i2,1)
        				_fentrans+=myfen_interno.substr(i2,1)
        				myadd=0;
        			}
        		}
        		myfen_1+=myfen_interno;                           //fentrans da il fen con gli 11111
        		myfen+=myfen_interno2+"/";
        		myfen_interno2="";
        		myfen_interno="";
        		Smyadd="";
        		myadd==0;
        	}
        	fen_little=myfen;//chiamato da little0 per transVIPVIP
        	var fen_arrocco="";
        	myfen=myfen.substr(0,-1);
        	fen_arrocco=""
        	if(t_AKB){fen_arrocco+='K'}if(t_AQB){fen_arrocco+='Q'}if (t_AKN){fen_arrocco+='k'}if (t_AQN){fen_arrocco+='q'}
        	if (fen_arrocco.length==0) {fen_arrocco="-";}	//cancella solo se spostati non minacciati
        	var num_m=0;
        	num_m=Math.floor( numero_mossa/2);

                   var chi=" w";
        	if (numero_mossa%2==1) {num_m=Math.floor( numero_mossa/2);chi=" b";}
        	_fentrans+=chi;
        	_fentrans+=" "+fen_arrocco;
           _fentrans+=" -";
        	myfen+=chi;
        	myfen+=" "+fen_arrocco;
        	myfen+=" -";

           obj.fentrans=_fentrans;


         //	cont_fen.fen_txt.text=myfen;
        	/*rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -                           myfen
              rnbqkbnrpppppppp11111111111111111111111111111111PPPPPPPPRNBQKBNR w KQkq -    fentrans    */
        }
        function NEWW_fen_cb_rettificato (str) {
        			   var str_normale =""
         				for (var uu =7;uu>=0;uu--) {
        						str_normale+=str.substr(8*uu,8)
        				}
        				NEWW_fen_cb (str_normale)
        }
        function stringFen111 ()  {
        			var str_normale ="";
         				for (var uu =7;uu>=0;uu--) {
        						str_normale+=fentrans.substr(8*uu,8)
        				}
        				return str_normale;
        }

        var func1_in_big = function(){

        }

        var func2_in_big = function(){

        }


        if (!options.little) {
          this.func1 = func1_in_big;
          this.func2 = func2_in_big;
        }
                function addDrag() {
                  /*
                  console.log('addDrag');

                              var SA_tutti_i_pezzi = ["kk2b", "kk2n", "q2b", "q2n", "kn", "rkn", "rqn", "bkn", "bqn", "kqn", "kkn", "qn", "kb", "rkb", "rqb", "bkb", "bqb",
                                "kqb", "kkb", "qb", "p1n", "p2n", "p3n", "p4n", "p5n", "p6n", "p7n", "p8n", "p1b", "p2b", "p3b", "p4b", "p5b", "p6b", "p7b", "p8b"];
                      for (i=0;i< SA_tutti_i_pezzi.length;i++) {
                             var elem =  $(my_div+' .'+SA_tutti_i_pezzi[i]+':eq(0)');
                             if (elem) {
                                      elem.draggable='true';
                                      elem.attr("ondragstart", "dragStart(event)");
                                      elem.attr("ondrop", "drop(event)");
                                      elem.attr("ondragover", "allowDrop(event)");
                             }
                  	  }

                      var columns=['','a','b','c','d','e','f','g','h'];
                      for (i=8; i>0; i--){
                              for (y=1; y<9; y++){
                                     var elem =  document.getElementById("d"+columns[y]+""+i);
                                     elem.addEventListener("drop",drop);
                                     elem.addEventListener("dragover",allowDrop);
                              }
                  	 }
                     */
                }
                var drag_allow=true;
                function ignoreDrag(e) {
                  e.originalEvent.stopPropagation();
                  e.originalEvent.preventDefault();
                }


                function mydragover(ev){  ignoreDrag(ev)
                        console.log('_________mydragover',ev.target.className.split(" ")[1]);
                        ev.originalEvent.preventDefault();
                }
               function dragStart (ev) {

                        console.log('drag',ev.target.className.split(" ")[1]); //drag ["centra_pezzi", "p5b"]
                        ev.originalEvent.dataTransfer.setData("Text",ev.target.className.split(" ")[1]);

                        console.log('drag',ev.target.className.split(" ")[1],controlla_colore(ev.target.className.split(" ")[1]));

                        if (controlla_colore(ev.target.className.split(" ")[1])) {
                          drag_allow=true;
                          console.log('drag_allow=true');
                        } else {
                                drag_allow=false;
                                console.log('errore non  muove il-> ',ev.target.className.split(" ")[1]);
                        }
                }
                function mydrop(ev){    console.log('mydrop');
                        var data=ev.originalEvent.dataTransfer.getData("Text"); //Qn
                        var piece=who_piece(data); //-nnKkQqNnBb
                        var case_origin=fromcase(data) ; //87  case
                        console.log('mydrop-data-piece-mycase->',data,piece,mycase);

                        var origin_row_cb=parseInt(case_origin.substr(0,1));
                        var origin_col_cb=parseInt(case_origin.substr(1,1));
                        var elem = $('.'+data+ ':eq(0)');
                        console.log('drop',elem.attr('class').split(" ")[1], drag_allow,ev.target.id.substring(0,1),origin_row_cb,origin_col_cb);
                        var my_idclass= elem.attr('class').split(" ")[1];
                         //var elem =  document.getElementById(data);
                  if (drag_allow) {
                              var col_case_start=get_column(origin_col_cb);
                              var case_start=col_case_start+origin_row_cb;
							  var mycase=ev.target.className.split(" ")[4];
                              console.log('.........da',col_case_start,case_start,mycase ,ev.target.className.split(" ")[4].substring(0,1));

                              //if (ev.target.id.substring(0,1)=="d") {
                              if (mycase.substring(0,1)=="d") {
                                      var case_end=mycase;
                                      var end_col_cb=parseInt(columnToNumber(case_end.substr(1,1)));
                                      var end_row_cb=parseInt(case_end.substr(2,1));
                                      console.log('da',col_case_start,case_start,mycase,case_end,data);
                                      console.log('...........', origin_row_cb,origin_col_cb,end_row_cb,end_col_cb);
                                      cb[origin_row_cb][origin_col_cb]="";
                                      cb[end_row_cb][end_col_cb]=data;
                                      console.log('...........',my_div,origin_row_cb,origin_col_cb,end_row_cb,end_col_cb);
                                      $( my_div + " ." + my_idclass + ":eq(0)").css({left: cb_x[end_row_cb][end_col_cb] + "px",top: cb_y[end_row_cb][end_col_cb] + "px"});
                                      numero_mossa+=1;
                                      console.log('..........',that.ok_my_div ,my_div, " ." + my_idclass + ":eq(0)");
                             /*
                                      //elem.style.left =cb_x[end_row_cb][end_col_cb] + "px";
                                      //elem.style.top =cb_y[end_row_cb][end_col_cb] + "px";
                                      console.log('drop',data,case_origin,case_end,elem.style.left,elem.style.top,end_col_cb,end_row_cb);
                                      avanti(piece+case_start+"-"+case_end.substr(1,2));
                                      */
                              } else if (ev.target.id.substring(0,1)!="d" && ev.target.id.substr(-1)==data.substr(-1)) {

                              }/*
                              else if (ev.target.id.substring(0,1)!="d" && ev.target.id.substr(-1)!=data.substr(-1)) {
                                      var PieceEaten=ev.target.id; // eat this piece
                                      var casePieceEaten=fromcase(PieceEaten) ; //87
                                      var casepieceeaten_row_cb=parseInt(casePieceEaten.substr(0,1));
                                      var casepieceeaten_col_cb=parseInt(casePieceEaten.substr(1,1));
                                      var col_case=get_column(casepieceeaten_col_cb);
                                      var elem_eaten =  document.getElementById(PieceEaten);
                                      elem_eaten.style.display = "none";

                                      cb[origin_row_cb][origin_col_cb]="";
                                      cb[casepieceeaten_row_cb][casepieceeaten_col_cb]="";
                                      cb[casepieceeaten_row_cb][casepieceeaten_col_cb]=data;

                                      elem.style.left =cb_x[casepieceeaten_row_cb][casepieceeaten_col_cb] + "px";
                                      elem.style.top =cb_y[casepieceeaten_row_cb][casepieceeaten_col_cb] + "px";

                                      //void case
                                      //  document.getElementById(ev.target.id).appendChild(document.getElementById(data));
                                      //  ev.target.appendChild(document.getElementById(data));
                                     // console.log('drag_eat',case_start,data,ev.target.id,elem.id,casePieceEaten.substr(1,1),col_case,casePieceEaten.substr(0,1));
                                      avanti(piece+case_start+"-"+col_case+casepieceeaten_row_cb);
                                      howMannyPieces('drag');
                              }
                      } else {
                             elem.style.left =cb_x[origin_row_cb][origin_col_cb] + "px";
                                elem.style.top =cb_y[origin_row_cb][origin_col_cb] + "px";
                      }
                      */
                   }
                }
                function this_move()
                {

                }
                function controlla_colore(pezzo) {
                	if (pezzo.substr(-1)=="n" && (numero_mossa%2==1)){return true;	}
                	if (pezzo.substr(-1)=="b" && (numero_mossa%2==0)){return true;	}
                	return false;
                }
                function who_piece(piece00)  {
                	if (piece00.substr(0,1)== "p") {	return "_";}
                	if (piece00.substr(0,1)== "k") {

                	    if (piece00.substr(-1)== "n" && piece00.length>2) {	return "n";}
                		 if (piece00.substr(-1)== "b" && piece00.length>2) {	return "N";}
                		 if (piece00.substr(-1)== "n" && piece00.length==2) {	return "k";}
                		 if (piece00.substr(-1)== "b" && piece00.length==2) {	return "K";}
                		 }
                	if (piece00.substr(0,1)== "b") {
                	    if (piece00.substr(-1)== "n" ) {	return "b";}
                		 if (piece00.substr(-1)== "b") {	return "B";}
                		 }
                	if (piece00.substr(0,1)== "r") {
                	    if (piece00.substr(-1)== "n" ) {	return "r";}
                		 if (piece00.substr(-1)== "b") {	return "R";}
                		 }
                    if (piece00.substr(0,1)== "q") {
                	    if (piece00.substr(-1)== "n" ) {	return "q";}
                		 if (piece00.substr(-1)== "b") {	return "Q";}
                		 }
                	return "";
                }
function fromcase(id) {
	    console.log('fromcase->',id);
        var i=0;var y=0;
        for (i=8; i>0; i--){   //add to chessboard
            for (y=1; y<9; y++){
                    if (cb[i][y]!="") {
                        if (cb[i][y]==id) { return ""+i+y; }
                    }
           }
        }
        return "";
}
                function clicksquare(ev)
                {
                 console.log('____________aquare',ev.target.className.split(" ") );
                }
        return this;
    };
})(jQuery);
(function ($) {

    $.aggiungi = function (options) {
              var defaults = {
            mossa: "",
            continua: 0,
            num_mossa_server: 0,
            trans: 0,
            _div: "",
            little: false
        } ;
                var options = $.extend(defaults, opt);
          this.my_div="gggggggggg";

                this.init_cb = function (mycontinua, mymossa, mynum_mossa_server, mytrans) {    }
                  return this;
    };

})(jQuery);
