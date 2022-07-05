import { FC, useState } from "react"
import { getCurrentDate } from "../../utils/date"
import { PostService } from '../../services/PostService'
import { responseErrorHandler } from "../../http/responseErrorHandler"
import { useFetch } from "../../hooks/useFetch"
import { IPost } from "../../models/IPost"
import Post from "./Post"
import PostForm from "./PostForm"
import styles from './index.module.scss'


interface Props {
  login: string
}

export type MutateErrorType = {
  message: string
  id: string
}

const Posts: FC<Props> = ({ login }) => {

  const [posts, error, setPosts] = useFetch<IPost[]>(PostService.getAll, [])
  const [updatePostError, setUpdatePostError] = useState<MutateErrorType | null>(null)
  const [addPostError, setAddPostError] = useState<string | null>(null)

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
      const errMessage = responseErrorHandler(err)
      setAddPostError(errMessage)
    }
  }

  const removePost = (id: string) => async () => {
    try {
      await PostService.remove(id)
      setPosts(posts => posts.filter(post => post.id !== id))
    } catch (err) {
      responseErrorHandler(err)
    }
  }

  const updatePost = (id: string) => async (editedText: string) => {
    try {
      await PostService.update(id, { text: editedText })
      setPosts(posts => {
        return posts.map(post => {
          if (post.id === id) {
            return { ...post, text: editedText }
          }
          return post
        })
      })
    } catch (err) {
      const errMessage = responseErrorHandler(err)
      setUpdatePostError({ message: errMessage, id })
    }
  }

  return (
    <div className={styles.wrapper}>
      <h1>{login}</h1>

      <PostForm addPost={addPost} />
      {addPostError && <div className={styles.error}>
        {addPostError}
      </div>}

      <section>
        {error && <div className={styles.error}>{error}</div>}
        {posts.map(({ id, timestamp, text }) => (
          <Post
            key={id}
            username={login}
            text={text}
            timestamp={timestamp}
            updatePostError={updatePostError?.id === id ? updatePostError.message : null}
            updatePost={updatePost(id)}
            removePost={removePost(id)}
          />
        )).reverse()}
        {!posts.length && (
          <h2>You haven't been posted any yet!</h2>
        )}
      </section>

    </div>
  )
}



export default Posts