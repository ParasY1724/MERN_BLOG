import { Fragment } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardMedia, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import ButtonAppBar from "./Navbar";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Slide from "./Slide";
import "./User.css";
function User(props) {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ post: [] });
  // const [li,setLike] = useState([]);
  const [image, setImage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/") {
      const fetchData = async function () {
        setIsLoading(true);
        await fetch(
          `${import.meta.env.VITE_REACT_APP_SERVER_URL}` + "/likedPost",
          { credentials: "include" }
        ).then((res) => {
          res.json().then((data) => {
            setImage(data.image);
            setData(data);
          });
        });
        setIsLoading(false);
      };
      fetchData();
    }
  }, [location.pathname]);
  // function like(post,id,i){
  //   axios.post(`${import.meta.env.VITE_REACT_APP_SERVER_URL}`+"/success/like",{...post,id: id},{withCredentials: true}).then((res)=>{
  //     console.log(res.data.message);
  //     if (res.data.message){
  //       setLike((prevValue)=>{
  //         let n = 0;
  //         if (res.data.n!==-1){
  //           n = 1;
  //         }
  //         else {
  //           n = -1;
  //         }
  //         const a = [...prevValue];
  //         a[i] = a[i]+n;
  //         return a;
  //       })
  //       // if (!res.data.n===-1){
  //       //   setLike((prevValue)=>{
  //       //     const a = [...prevValue];
  //       //     a[i] = a[i]+1;
  //       //     return a;
  //       //   })
  //       // }
  //     }
  //   });
  // }
  console.log(data);
  return (
    <>
    
      <ButtonAppBar image={image} logout={props.logout} />
      {/* <AppBar>
    <AddIcon></AddIcon>
    <Avatar><img onClick={()=>{
        navigate("/dashboard");
      }}src={image} alt="Profile" />
      </Avatar>
      </AppBar> */}
      <Slide />
      <Box sx={{ flexGrow: 1 }} className="box">
        <h2 className="blog">My Liked Blogs</h2>
        <hr className="blogline" />

        {/* {isLoading?<h2>Loading....</h2>:
      (data&&data.map((u) => {
        return (
          <Grid container className="grid" spacing={3} key={u._id}>
            {u.post.map((p, i) => {
              const id = i.toString();
              return (
                <Grid item xs={12} sm={4} key={u._id + id }>
               <Item><Card key={u.id + id}  onClick = {(()=>{
                  navigate("/post",{state: {image: {image},name: u.name,post: p,id: u._id,l: li[i]}});
                })}>
                  <CardMedia component="img" height="200" image={p.image} alt="Chevrolet" />
                  <CardHeader title={p.title} />
                </Card>
                </Item>
                </Grid>
                
              );
            })}
          </Grid>
        );
      }))} */}
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          <Grid container className="grid" spacing={3}>
            {data?.post.length !== 0 ? (
              data?.post.map((p) => {
                console.log(p.id);
                return (
                  <Grid item xs={12} sm={4} key={p.post._id}>
                    <Item>
                      <Card
                        onClick={() => {
                          navigate("/post", {
                            state: {
                              image: { image },
                              name: data.name,
                              post: p.post,
                              id: p.id,
                              l: p.post.like.n,
                            },
                          });
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="200"
                          image={p.post.image}
                          alt="Chevrolet"
                        />
                        <CardHeader title={p.post.title} />
                      </Card>
                    </Item>
                  </Grid>
                );
              })
            ) : (
              <h2 className="blog1">
                No liked blogs explore the new and trending section.
              </h2>
            )}
          </Grid>
        )}
      </Box>
    </>
  );
}

export default User;
