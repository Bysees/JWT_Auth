import { FC, useState } from "react"
import { getCurrentDate } from "../../utils/date"
import { PostService } from '../../api/PostService'
import Post from "./Post"
import PostForm from "./PostForm"
import styles from './index.module.scss'
import { useFetch } from "../../hooks/useFetch"
import { IPost } from "../../models/IPost"
import { responseErrorHandler } from "../../api"


interface Props {
  login: string
}

type MutateError = 'create' | 'update' | 'delete' | null //? Подумать как реализовать...

const Posts: FC<Props> = ({ login }) => {

  //? Возвращённая ошибка то не обновляется
  const [posts, error, setPosts] = useFetch<IPost[]>(PostService.getAll, [])
  const [mutateError, setMutateError] = useState<string | null>(null)

  const addPost = async (text: string) => {
    if (!text) return

    const post = {
      timestamp: getCurrentDate(),
      text: text
    }

    try {
      const response = await PostService.create(post)
      setPosts(posts => [...posts, response.data])
    } catch (err) {
      responseErrorHandler(err, setMutateError)
    }
  }

  const removePost = (_id: string) => async () => {
    try {
      await PostService.remove(_id)

      setPosts(posts => posts.filter(post => post._id !== _id))
    } catch (err) {
      responseErrorHandler(err, setMutateError)
    }
  }

  const updatePost = (_id: string) => async (editedText: string) => {
    try {
      await PostService.update(_id, { text: editedText })

      setPosts(posts => posts.map(post => {
        if (post._id === _id) {
          return { ...post, text: editedText }
        }
        return post
      }))
    } catch (err) {
      responseErrorHandler(err, setMutateError)
    }
  }

  return (
    <div className={styles.wrapper}>
      <h1>{login}</h1>

      <PostForm addPost={addPost} />

      <section>
        {error && <div>{error}</div>}
        {posts.map(({ _id, timestamp, text }) => (
          <Post
            key={_id}
            username={login}
            text={text}
            timestamp={timestamp}
            updatePost={updatePost(_id)}
            removePost={removePost(_id)}
          />
        )).reverse()}
      </section>

    </div>
  )
}



export default Posts