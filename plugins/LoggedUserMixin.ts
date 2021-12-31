import Vue from 'vue'
import * as jwt from 'jsonwebtoken';

export default Vue.extend({
  methods: {
    getLoggedUserId(): number {
      const token: string = (this as any).$apolloHelpers.getToken();
      try {
        const jwtPayLoad: jwt.JwtPayload = <jwt.JwtPayload>jwt.verify(token, 'secret');
        return jwtPayLoad.id;
      } catch (error) {
        return -1;
      }
    },
  },
});
