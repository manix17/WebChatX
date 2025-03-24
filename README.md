
# 📞 Video Call App

## 🏗 Architecture

### Server-Side

- Express server handles HTTP requests
- Socket.IO manages real-time communication
- TypeScript ensures type safety
- WebRTC signaling server coordinates peer connections

### Client-Side

- HTML5 for structure
- CSS3 for styling and animations
- JavaScript handles WebRTC and Socket.IO client operations
- Media stream handling for video/audio

## 📡 API Documentation

### Socket Events

#### Client to Server

- `call-user`: Initiates a call to another user

  ```javascript
  socket.emit('call-user', {
    offer: RTCSessionDescription,
    to: targetSocketId
  });
  ```

#### Server to Client

- `update-user-list`: Updates the active users list
- `call-made`: Notifies of incoming call
- `answer-made`: Handles call answer
- `remove-user`: Removes disconnected user

## 🌐 Browser Support

- Chrome (version 80+)
- Firefox (version 75+)
- Safari (version 13+)
- Edge (Chromium-based, version 80+)

## ❗ Troubleshooting

### Common Issues

1. **Video/Audio Not Working**
   - Check browser permissions
   - Ensure camera/microphone is not in use
   - Verify SSL certificate in production

2. **Connection Issues**
   - Check network connectivity
   - Verify WebRTC is not blocked
   - Check firewall settings

3. **Performance Issues**
   - Reduce video quality
   - Check network bandwidth
   - Close other media applications

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch

   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. Commit your changes

   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

4. Push to the branch

   ```bash
   git push origin feature/AmazingFeature
   ```

5. Open a Pull Request

### Coding Standards

- Use TypeScript for type safety
- Follow ESLint configuration
- Write unit tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the ISC License. See the `package.json` file for details.

## 🙏 Acknowledgments

- WebRTC Community
- Socket.IO Team
- TypeScript Team
- All contributors
