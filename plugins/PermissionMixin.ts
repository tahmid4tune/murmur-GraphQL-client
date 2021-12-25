import Vue from 'vue'
import * as jwt from 'jsonwebtoken';
import { Post } from '../store/types';

export default Vue.extend({
  methods: {
    permittedToEdit(post: Post) {
      const token: string = (this as any).$apolloHelpers.getToken();
      try {
        const jwtPayLoad: jwt.JwtPayload = <jwt.JwtPayload>jwt.verify(token, 'secret');
        return jwtPayLoad.id === post.author.id;
      } catch (error) {
        return false;
      }
    },
  },
});
