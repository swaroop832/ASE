package me.smarthwatches.simplenotification;

import android.app.Activity;
import android.os.Bundle;
import android.support.wearable.view.WatchViewStub;
import android.view.View;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;





public class WearActivity extends Activity {

    private TextView mTextView;
    String sourceText;
    TextView outputTextView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_wear);
        final WatchViewStub stub = (WatchViewStub) findViewById(R.id.watch_view_stub);

        stub.setOnLayoutInflatedListener(new WatchViewStub.OnLayoutInflatedListener() {
            @Override
            public void onLayoutInflated(WatchViewStub stub) {
                mTextView = (TextView) stub.findViewById(R.id.text);
            }
        });

    }

    public void translateText(View v) {

        outputTextView = (TextView) findViewById(R.id.txt_Result);
        TextView sourceTextView = (TextView) findViewById(R.id.txt_Email);

        sourceText = sourceTextView.getText().toString();
        sourceText = sourceTextView.getText().toString();
        String  getURL = "https://kgsearch.googleapis.com/v1/entities:search?"+
                "query="+sourceText + "&" + "key=AIzaSyDREwcvZ4t5XU0hSniZHmYYRi42jqyJWN0" + "&" +
                "limit=1"+ "&" +"indent=true";
        OkHttpClient client = new OkHttpClient();
        try {
            Request request = new Request.Builder()
                    .url(getURL)
                    .build();
            client.newCall(request).enqueue(new Callback() {
                @Override
                public void onFailure(Call call, IOException e) {
                    System.out.println(e.getMessage());
                }
                @Override
                public void onResponse(Call call, Response response) throws IOException {
                    final JSONObject jsonResult;
                    final JSONObject itemList;
                    final String result = response.body().string();
                    try {
                        jsonResult = new JSONObject(result);
                        //System.out.println("start here,,,,,,,,,,,,");
                        //itemList = new JSONObject(jsonResult.getString("itemListElement"));

                        //System.out.println((itemList));
                        //System.out.println("end here,,,,,,,,,,,,");
                        JSONArray convertedTextArray = jsonResult.getJSONArray("itemListElement");

                        final String convertedText = convertedTextArray.get(0).toString();
                        //JSONObject hello = jsonResult.getJSONObject("itemListElement");
                        //System.out.println(convertedText.toString());
                        String s = convertedText.toString();
                        final String y=s.substring(s.indexOf("description") + 14 , s.indexOf(",\"image"));
                        runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                outputTextView.setText(y);
                            }
                        });
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
            });


        } catch (Exception ex) {
            outputTextView.setText(ex.getMessage());

        }

    }
}

