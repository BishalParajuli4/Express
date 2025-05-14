import { NextFunction, Request, Response } from "express";

export function middleWareAdmin(req: Request, res: Response, next: NextFunction) {
  const role = req.query.role;

  if (role === "admin") {
    next();
    return;
  } else {
    next({
      message: "you are not an Admin",
      status: 483,
    });
    return;
  }
};

export function middleWareUser (req: Request, res: Response, next: NextFunction){
    const userName = req.query.name;
    if(userName === "bishal"){
        next();
        return;
    }
    else{
        next({
            message: "You are not elligible",
            status: 483,
        })
        return;
    }

};


//tessai hawa ma garyeko yo wala


// export function middleWareUserbyId (req: Request, res: Response, next: NextFunction){
//     const userName = req.query.name;
//     if(userName === "bishal"){
//         next();
//         return;
//     }
//     else{
//         next({
//             message: "You are not elligible",
//             status: 483,
//         })
//         return;
//     }

// }
