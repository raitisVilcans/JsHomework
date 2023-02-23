(function() {
    const maze = [
        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 1, 0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
        [0, 1, 1, 1, 0, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 1, 0, 1, 0],
        [0, 1, 1, 1, 1, 1, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    let matrix = maze.map(row => row.map(cell => cell? 1 : 0));

    let currentPosition = [0,1];
    const end = [8,9];




    function createPoligon(){
        for (let i = 0; i < maze.length; i++) {
            for(let j = 0; j < maze[i].length; j++) {
                if (maze[i][j]===0) {
                    var element = document.getElementById("maze");
                    var rectangle = element.getContext("2d");
                    rectangle.beginPath();
                    rectangle.rect(j*50, i*50, 50, 50);
                    rectangle.fillStyle = "#cce6ff";
                    rectangle.fill();
                }
            }
        }
    }

    function printCurrentState(currentPosition){
        for (let i = 0; i < maze.length; i++) {
            for(let j = 0; j < maze[i].length; j++) {
                if (i === currentPosition[0] && j === currentPosition[1]) {
                    var element = document.getElementById("maze");
                    var rectangle = element.getContext("2d");
                    rectangle.beginPath();
                    rectangle.rect(j*50, i*50, 50, 50);
                    rectangle.fillStyle = "#FF0000";
                    rectangle.fill();
                    return;
                } 
            }
        }
    }

    function deletePreviousState(row, column){
        for (let i = 0; i < maze.length; i++) {
            for(let j = 0; j < maze[i].length; j++) {
                if (i == row && j === column && maze[i][j] === 0) {
                    var element = document.getElementById("maze");
                    var rectangle = element.getContext("2d");
                    rectangle.beginPath();
                    rectangle.rect(j*50, i*50, 50, 50);
                    rectangle.fillStyle = "#cce6ff";
                    rectangle.fill();
                }else {
                    if (i == row && j === column && maze[i][j] === 1) {
                        var element = document.getElementById("maze");
                        var rectangle = element.getContext("2d");
                        rectangle.beginPath();
                        rectangle.rect(j*50, i*50, 50, 50);
                        rectangle.fillStyle = "#ffffff";
                        rectangle.fill();
                    }
                }  
            }
        }
    }


    function movePosition(currentPosition, endPosition, row, col){
        
        for (let i = 0; i < maze.length; i++) {
            for(let j = 0; j < maze[i].length; j++) {

                if (i  == currentPosition[0] && j ===  currentPosition[1] && i + row === endPosition[0] && j + col === endPosition[1]) {
                    currentPosition [0] = i + row;
                    currentPosition[1] = j + col;
                    deletePreviousState(i, j);
                    printCurrentState(currentPosition);
                    alert("Well done!");
                    return currentPosition;
                    
                }

                if (i  == currentPosition[0] && j ===  currentPosition[1] && maze[i + row] [j + col] === 1) {
                    currentPosition [0] = i + row;
                    currentPosition[1] = j + col;
                    deletePreviousState(i, j);
                    printCurrentState(currentPosition);
                    return currentPosition;

                    
                }

                

            }
        }

        return currentPosition;
            
    }


    function keyPress(currentPosition, endPosition){
        document.onkeydown = function(event) {
            let res;
            switch (event.keyCode) {
            case 37:
                //left
                    currentPosition = movePosition(currentPosition, endPosition ,0, -1);
                    return currentPosition;
            case 38:
                // key up
                    currentPosition =movePosition(currentPosition, endPosition ,-1, 0);
                    return currentPosition;
            case 39:
                //right 
                    currentPosition =movePosition(currentPosition, endPosition ,0, 1);
                    return currentPosition;
            case 40:
                // key down
                    currentPosition = movePosition(currentPosition, endPosition ,1, 0);  
                    return currentPosition;
            }
        }
    }


    function findWay(position, end) {
        var queue = [];
    
        matrix[position[0]][position[1]] = 0;
        queue.push([position]); // store a path, not just a position
    
        while (queue.length > 0) {
        var path = queue.shift(); // get the path out of the queue
        var pos = path[path.length-1]; // ... and then the last position from it
        var direction = [
            [pos[0] + 1, pos[1]],
            [pos[0], pos[1] + 1],
            [pos[0] - 1, pos[1]],
            [pos[0], pos[1] - 1]
        ];
    
        for (var i = 0; i < direction.length; i++) {
            // Perform this check first:
            if (direction[i][0] === end[0] && direction[i][1] === end[1]) {
            // return the path that led to the find
            return path.concat([end]); 
            }
            
            if (direction[i][0] < 0 || direction[i][0] >= matrix.length 
                || direction[i][1] < 0 || direction[i][1] >= matrix[0].length 
                || matrix[direction[i][0]][direction[i][1]] != 1) { 
            continue;
            }
    
            matrix[direction[i][0]][direction[i][1]] = 0;
            // extend and push the path on the queue
            queue.push(path.concat([direction[i]])); 
        }
        }
    }



    function showShortestWay(currentPosition, end){
        document.getElementById("show-way-btn").onclick = function(){
            let paths;
            paths = findWay(currentPosition, end);
            for(i=1;i<paths.length;i++)
            {
                var element = document.getElementById("maze");
                var rectangle = element.getContext("2d");
                rectangle.beginPath();
                rectangle.rect(paths[i][1]*50, paths[i][0]*50, 50, 50);
                rectangle.fillStyle = "#D3D3D3";
                rectangle.fill();
                
            }
        };
    }



    showShortestWay(currentPosition, end);
    printCurrentState(currentPosition);
    createPoligon();
    currentPosition = keyPress(currentPosition, end);

})();