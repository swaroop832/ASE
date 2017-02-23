package tutorial.maps.google.googlemapsapplication;

import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.provider.MediaStore;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;


public class MainActivity extends AppCompatActivity {
    Button button_map, button_photo;
    public static Bitmap photo;
    public static boolean cam_flag = false;
    public static String picturePath;//refer to browse file
    public static ImageView BrowseView;//refer to browse file
    public static boolean browse_flag = false;//refer to photo activity.
    int TAKE_PHOTO_CODE = 0;
    ImageView userImage ;

    /**
     * Called when the activity is first created.
     */

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);
        Button capture = (Button) findViewById(R.id.btn_take_photo);
        userImage = (ImageView) findViewById(R.id.view_photo);
        //Button click eventlistener. Initializes the camera.

        // getActionBar().setTitle("Home page");
        button_map = (Button) findViewById(R.id.main_btn_maps);

        capture.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Intent cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                startActivityForResult(cameraIntent, TAKE_PHOTO_CODE);

            }
        });



    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == TAKE_PHOTO_CODE && resultCode == RESULT_OK) {
            Bitmap photo = (Bitmap) data.getExtras().get("data");
            userImage.setImageBitmap(photo);
            Log.d("CameraDemo", "Pic saved");
        }
    }

    public void onClickOfMapButton(View v) {
        //This code redirects the from main page to the maps page.
        Intent redirect = new Intent(MainActivity.this, BrowseActivity.class);
        startActivity(redirect);
    }

    public void onClickOfMapButtons(View v) {
        //This code redirects the from main page to the maps page.
        Intent redirect = new Intent(MainActivity.this, MapsActivity.class);
        startActivity(redirect);
    }

    public void Register(View v) {
        //This code redirects the from main page to the maps page.
        Intent redirect = new Intent(MainActivity.this, MapsActivity.class);
        startActivity(redirect);
    }

}
