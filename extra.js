
//the lerp take 3 inputs A,B and t where a is initial(min value) , B is final(max value) and t in the fraction or 
//percentage so it atually provides a value between A and B of the given percentage( mainly the percentage more than A)
function lerp(A,B,t){
    return A+(B-A)*t;
}


function getIntersection(A,B,C,D){ 
    const tTop=(D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);//y
    const uTop=(C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);//x
    const bottom=(D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);
    

    /*
    so in Here of I is the point of intersection then it has 2 parts Ix and Iy
    if they intersect they both should satisfy
    Ix=Ax+(Bx -Ax)t = Cx (Dx -Cx)u  
    Iy=Ay+(By -Ay)t = Cy (Dy -Cy)u

    from 
    function lerp(A,B,t){
        return A+(B-A)*t;
    }
    there will be 2 value of t or fraction as one fraction (in lerep) will not intersect


    */
    if(bottom!=0){
        const t=tTop/bottom;//y
        const u=uTop/bottom;//x
        if(t>=0 && t<=1 && u>=0 && u<=1){
            return {
                x:lerp(A.x,B.x,t),
                y:lerp(A.y,B.y,t),
                offset:t
            }
        }
    }

    return null;
}



function polysIntersect(poly1, poly2){
    for(let i=0;i<poly1.length;i++){
        for(let j=0;j<poly2.length;j++){
            const touch=getIntersection(
                poly1[i],
                poly1[(i+1)%poly1.length],
                poly2[j],
                poly2[(j+1)%poly2.length]
            );
            if(touch){
                return true;
            }
        }
    }
    return false;
}



function getRGBA(value){
    const alpha=Math.abs(value);
    const R=value<0?0:255;
    const G=R;
    const B=value>0?0:255;
    return "rgba("+R+","+G+","+B+","+alpha+")";
}



function getRandomColor(){
    const hue=290+Math.random()*260;
    return "hsl("+hue+", 100%, 60%)";
}
 