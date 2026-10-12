"""Photo → generated drawing → photo. Stable camera, six-second silent loop."""
from pathlib import Path
import subprocess
root = Path(__file__).resolve().parents[1]
# A broad, softly feathered wipe avoids double edges during the style change.
progress = 'if(lt(T,0.4),0,if(lt(T,2),0.5-0.5*cos(PI*(T-0.4)/1.6),if(lt(T,2.7),1,if(lt(T,4.8),0.5+0.5*cos(PI*(T-2.7)/2.1),0))))'
mask = f'clip((({progress})*1120-X)/160,0,1)'
filters = f"[0:v]scale=960:720,setsar=1,format=yuv444p[a];[1:v]scale=960:720,setsar=1,format=yuv444p[b];[a][b]blend=all_expr='A*(1-({mask}))+B*({mask})',format=yuv420p[out]"
subprocess.run(['ffmpeg','-y','-v','error','-threads','2','-loop','1','-framerate','30','-i',str(root/'public/images/image_odo_4.jpg'),'-loop','1','-framerate','30','-i',str(root/'public/images/motion/odo-drawing.webp'),'-filter_complex_threads','2','-filter_complex',filters,'-map','[out]','-t','6','-an','-c:v','libx264','-preset','slow','-crf','24','-movflags','+faststart',str(root/'public/videos/odo-drawing-loop.mp4')],check=True)
