export function ordenarRanking( a, b ) {
        
    if ( a.acertos < b.acertos ) {
      return -1;
    }

    else if ( a.acertos > b.acertos ) {
      return 1;
    } 

    return 0;
}