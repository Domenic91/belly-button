interface GameField {
    id: number,
    value: string | number,
} 

(n: number): GameField[] =>{
    const startID = (Math.random() * n) + 1;
    const endID = (Math.random() * n * n) + (n * (n - 1));

    return Array.from({ length: n*n }, (_, idx) => {
        if (idx === startID){
            return { 
                id: idx,
                value: "start",
            };
        }else if (idx === endID){
            return { 
                id: idx,
                value: "end",
            }; 
        }
       return { 
            id: idx,
            value: (Math.random() * 9) + 1,
        };
    })
}
