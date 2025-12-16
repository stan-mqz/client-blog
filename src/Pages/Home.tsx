import { useLoaderData } from "react-router-dom"
import { getPosts } from "../services/AuthService"

export const loader = async () => {
  const posts = await getPosts

  return posts
}

export const Home = () => {

  const posts = useLoaderData()

  return (
    <div>{posts}</div>
  )
}
