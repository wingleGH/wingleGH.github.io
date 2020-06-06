// JavaScript Document
/*AI1,执白棋*/
var chessCounts = 1;
var AI1_ID,AI2_ID;
function CCMode(){
	if(battleModeFlag == "CC"&&!ccGameOver){
		AI1_ID = setInterval("CCAI1()",2000);
	}
}

function CCAI1(){
	/*暂停AI对局*/
	if(ccGameOver){
		return;
	}
	
	AI2_ID = setTimeout("CCAI2()",1000);
	var maxScore = 0;//记录最高分
	x = 0,y = 0;//记录最高分对应的棋子位置
	
	/*初始化分数统计数组，重新开局需要清空*/
	for(var i = 0;i<chessSize;i++){
		personScore[i] = [];
		computerScore[i] = [];
		for(var j = 0;j<chessSize;j++){
			personScore[i][j] = 0;
			computerScore[i][j] = 0;
		}
	}
	
	/*遍历赢法数组计算得分*/
	for(var i = 0;i<chessSize;i++){
		for(var j = 0;j<chessSize;j++){
			if(chessLegalArray[i][j] == 0){
				for(var k = 0;k<count;k++){
					if(wins[i][j][k]){
						if(computerWin[k] == 1){
							computerScore[i][j] += 50;
						}else if(computerWin[k] == 2){
							computerScore[i][j] += 200;
						}else if(computerWin[k] == 3){
							optimizeAI(i,j,k,"person");
						}else if(computerWin[k] == 4){
							computerScore[i][j] += 2000000;
						}
						if(personWin[k] == 1){
							personScore[i][j] += 55;
						}else if(personWin[k] == 2){
							personScore[i][j] += 220;
						}else if(personWin[k] == 3){
							optimizeAI(i,j,k,"computer");
						}else if(personWin[k] == 4){
							personScore[i][j] += 2200000;
						}
					}
				}
				if(computerScore[i][j]>maxScore){
					maxScore = computerScore[i][j];
					x = i;
					y = j;
				}else if(computerScore[i][j] == maxScore){
					if(personScore[i][j]>personScore[x][y]){
						x = i;
						y = j;
					}
				}
				if(personScore[i][j]>maxScore){
					maxScore = personScore[i][j];
					x = i;
					y = j;
				}else if(personScore[i][j] == maxScore){
					if(computerScore[i][j]>computerScore[x][y]){
						x = i;
						y = j;
					}
				}
			}
		}
	}
	/*当双方剩余棋位都无效时，结束对局并显示结果*/
	if(maxScore == 0){
		open_suggest("平局 ！");
		clearInterval(AI1_ID);
		clearTimeout(AI2_ID);
		ccGameOver = true;
	}
	fallingChess.play();
	drawChess(x,y,false);
	chessCounts++;
	/*当棋盘下满仍未分出胜负，则结束游戏并显示平局*/
	if(chessCounts>(chessSize*chessSize-1)){
		open_suggest("平局 ！");
		clearInterval(AI1_ID);
		clearTimeout(AI2_ID);
		ccGameOver = true;
	}
	chessLegalArray[x][y] = 1;
	for(var k = 0;k<count;k++){
		if(wins[x][y][k]){
			personWin[k]++;
			computerWin[k] = 6;
			if(personWin[k] == 5){
				open_suggest("AI1赢了 ！");
				clearInterval(AI1_ID);
				clearTimeout(AI2_ID);
				ccGameOver = true;
			}
		}
	}
}
/*AI2执黑棋先手*/
function CCAI2(){
	var maxScore = 0;//记录最高分
	x = 0,y = 0;//记录最高分对应的棋子位置

	/*初始化分数统计数组，重新开局需要清空*/
	for(var i = 0;i<chessSize;i++){
		personScore[i] = [];
		computerScore[i] = [];
		for(var j = 0;j<chessSize;j++){
			personScore[i][j] = 0;
			computerScore[i][j] = 0;
		}
	}
	
	/*遍历赢法数组计算得分*/
	for(var i = 0;i<chessSize;i++){
		for(var j = 0;j<chessSize;j++){
			if(chessLegalArray[i][j] == 0){
				for(var k = 0;k<count;k++){
					if(wins[i][j][k]){
						if(personWin[k] == 1){
							personScore[i][j] += 50;
						}else if(personWin[k] == 2){
							personScore[i][j] += 200;
						}else if(personWin[k] == 3){
							optimizeAI(i,j,k,"person");
						}else if(personWin[k] == 4){
							personScore[i][j] += 2000000;
						}
						if(computerWin[k] == 1){
							computerScore[i][j] += 55;
						}else if(computerWin[k] == 2){
							computerScore[i][j] += 220;
						}else if(computerWin[k] == 3){
							optimizeAI(i,j,k,"computer");
						}else if(computerWin[k] == 4){
							computerScore[i][j] += 2200000;
						}
					}
				}
				if(personScore[i][j]>maxScore){
					maxScore = personScore[i][j];
					x = i;
					y = j;
				}else if(personScore[i][j] == maxScore){
					if(computerScore[i][j]>computerScore[x][y]){
						x = i;
						y = j;
					}
				}
				if(computerScore[i][j]>maxScore){
					maxScore = computerScore[i][j];
					x = i;
					y = j;
				}else if(computerScore[i][j] == maxScore){
					if(personScore[i][j]>personScore[x][y]){
						x = i;
						y = j;
					}
				}
			}
		}
	}
	/*当双方剩余棋位都无效时，结束对局并显示结果*/
	if(maxScore == 0){
		open_suggest("平局 ！");
		clearInterval(AI1_ID);
		clearTimeout(AI2_ID);
		ccGameOver = true;
	}
	fallingChess.play();
	drawChess(x,y,true);
	chessCounts++;
	if(chessCounts>(chessSize*chessSize-1)){
		open_suggest("平局 ！");
		ccGameOver = true;
		clearInterval(AI1_ID);
	}
	chessLegalArray[x][y] = 2;
	for(var k = 0;k<count;k++){
		if(wins[x][y][k]){
			computerWin[k]++;
			personWin[k] = 6;
			if(computerWin[k] == 5){
				open_suggest("AI2赢了 ！");
				clearInterval(AI1_ID);
				ccGameOver = true;
			}
		}
	}
}