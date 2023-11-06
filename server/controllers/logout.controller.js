
// logout controller
export function logout(req, res){
    res.clearCookie('token');
    return res.json({status: `success`});
  }