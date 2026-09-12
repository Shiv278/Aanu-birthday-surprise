import cv2
import numpy as np
import os
from pathlib import Path

class RainVideoGenerator:
    def __init__(self, width=1920, height=1080, fps=30, duration_seconds=15):
        self.width = width
        self.height = height
        self.fps = fps
        self.duration_seconds = duration_seconds
        self.total_frames = fps * duration_seconds
        
    def create_forest_background(self):
        """Create a moody forest background suitable for rain"""
        # Create base image with gradient sky
        bg = np.zeros((self.height, self.width, 3), dtype=np.uint8)
        
        # Dark moody sky gradient (dark gray to darker gray)
        for y in range(self.height // 2):
            color_value = int(40 + (y / (self.height // 2)) * 20)
            bg[y, :] = [color_value, color_value, color_value + 10]
        
        # Ground (wet, dark)
        for y in range(self.height // 2, self.height):
            color_value = int(30 + ((y - self.height // 2) / (self.height // 2)) * 40)
            bg[y, :] = [color_value - 10, color_value, color_value - 5]
        
        # Add some tree silhouettes on the sides
        self._add_tree_silhouettes(bg)
        
        # Add subtle texture/noise for realism
        noise = np.random.randint(-5, 5, bg.shape, dtype=np.int16)
        bg = np.clip(bg.astype(np.int16) + noise, 0, 255).astype(np.uint8)
        
        return bg
    
    def _add_tree_silhouettes(self, image):
        """Add tree shapes to the background"""
        # Left side trees
        pts_left = np.array([
            [0, self.height],
            [150, self.height // 2],
            [250, self.height],
            [0, self.height]
        ], dtype=np.int32)
        cv2.fillPoly(image, [pts_left], (20, 25, 20))
        
        # Right side trees
        pts_right = np.array([
            [self.width, self.height],
            [self.width - 150, self.height // 2],
            [self.width - 250, self.height],
            [self.width, self.height]
        ], dtype=np.int32)
        cv2.fillPoly(image, [pts_right], (20, 25, 20))
        
        # Center background trees
        pts_center = np.array([
            [self.width // 2 - 100, self.height],
            [self.width // 2, self.height // 3],
            [self.width // 2 + 100, self.height],
            [self.width // 2 - 100, self.height]
        ], dtype=np.int32)
        cv2.fillPoly(image, [pts_center], (25, 30, 25))
    
    def generate_rain_particles(self, frame_num):
        """Generate rain particles for a specific frame"""
        particles = []
        
        # Create a deterministic but varying rain pattern
        np.random.seed(frame_num % 60)  # Cycle every 60 frames for variation
        
        # Generate rain drops
        num_drops = 800
        for i in range(num_drops):
            x = np.random.randint(0, self.width)
            y = (frame_num * 8 + np.random.randint(-50, 50)) % (self.height + 100)
            y -= 100
            length = np.random.randint(15, 35)
            thickness = np.random.randint(1, 2)
            opacity = np.random.randint(100, 200)
            
            particles.append({
                'x': x,
                'y': y,
                'length': length,
                'thickness': thickness,
                'opacity': opacity
            })
        
        return particles
    
    def draw_rain(self, frame, particles):
        """Draw rain particles on the frame"""
        rain_overlay = frame.copy()
        
        for particle in particles:
            x1 = int(particle['x'])
            y1 = int(particle['y'])
            x2 = int(particle['x'] + 2)
            y2 = int(particle['y'] + particle['length'])
            
            # Only draw if within bounds
            if 0 <= y1 < self.height and 0 <= y2 < self.height:
                # Create rain color (light gray/white)
                color = (200, 200, 200)
                
                # Draw with varying opacity
                opacity = particle['opacity'] / 255.0
                cv2.line(rain_overlay, (x1, y1), (x2, y2), color, 
                        particle['thickness'], cv2.LINE_AA)
        
        # Blend rain with original frame for semi-transparency
        frame = cv2.addWeighted(frame, 0.7, rain_overlay, 0.3, 0)
        
        return frame
    
    def add_mist_effect(self, frame, intensity=0.15):
        """Add mist/fog effect for atmospheric depth"""
        mist = np.ones_like(frame) * 100
        frame = cv2.addWeighted(frame, 1.0, mist, intensity, 0)
        return np.clip(frame, 0, 255).astype(np.uint8)
    
    def generate_video(self, output_path='rain_video.mp4'):
        """Generate the complete rain video"""
        print(f"🌧️  Generating rain video...")
        print(f"Resolution: {self.width}x{self.height}")
        print(f"Duration: {self.duration_seconds} seconds ({self.total_frames} frames)")
        print(f"FPS: {self.fps}")
        print()
        
        # Setup video writer
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        out = cv2.VideoWriter(output_path, fourcc, self.fps, 
                             (self.width, self.height))
        
        if not out.isOpened():
            print("❌ Error: Could not create video writer. Make sure ffmpeg is installed.")
            print("Install it with: apt-get install ffmpeg (Linux) or brew install ffmpeg (Mac)")
            return False
        
        # Generate and write frames
        for frame_num in range(self.total_frames):
            # Create base frame
            frame = self.create_forest_background()
            
            # Generate and draw rain
            particles = self.generate_rain_particles(frame_num)
            frame = self.draw_rain(frame, particles)
            
            # Add atmospheric effects
            frame = self.add_mist_effect(frame, intensity=0.1)
            
            # Write frame
            out.write(frame)
            
            # Progress indicator
            progress = (frame_num + 1) / self.total_frames * 100
            bar_length = 40
            filled = int(bar_length * (frame_num + 1) / self.total_frames)
            bar = '█' * filled + '░' * (bar_length - filled)
            print(f'\rProgress: [{bar}] {progress:.1f}%', end='', flush=True)
        
        out.release()
        print(f'\n\n✅ Video saved to: {output_path}')
        return True

if __name__ == "__main__":
    # Configuration
    OUTPUT_FILE = "rain_sleep_video_15sec.mp4"
    
    # Create generator (15 seconds at 30 FPS = 450 frames)
    generator = RainVideoGenerator(
        width=1920,
        height=1080,
        fps=30,
        duration_seconds=15
    )
    
    # Generate the video
    success = generator.generate_video(OUTPUT_FILE)
    
    if success:
        print(f"\n📊 Video details:")
        print(f"   Size: 1920x1080 (Full HD)")
        print(f"   Length: 15 seconds (loopable)")
        print(f"   Format: MP4 (H.264)")
        print(f"\n💡 Next steps:")
        print(f"   1. Use ffmpeg to loop this video to 1 hour:")
        print(f"      ffmpeg -stream_loop 239 -i {OUTPUT_FILE} -c copy rain_1hour.mp4")
        print(f"\n   2. Or upload as-is and YouTube will loop it!")
