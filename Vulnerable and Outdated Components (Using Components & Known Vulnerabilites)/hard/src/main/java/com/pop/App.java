package com.pop;

import static spark.Spark.get;
import static spark.Spark.options;
import static spark.Spark.port;
import static spark.Spark.post;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.FileInputStream;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.Base64;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Random;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import spark.Request;

public class App {

  private static final Logger log = LoggerFactory.getLogger(App.class);


  private static ObjectMapper deserializer = new ObjectMapper().enableDefaultTyping();
  private static Map<String, String> questionSolutions = new HashMap<String, String>() {
    {
      put("king_of_rap","Eminem");
      put("queen_of_soul","Adele");
      put("king_of_jazz","Louis Armstrong");
      put("queen_of_pop","Beyonce");
      put("king_of_rnb","Chris Brown");
      put("queen_of_christmas","Mariah Carey");
      put("king_of_antipop","Kurt Cobain");
      put("king_of_reggae","Daddy Yankee");
      put("king_of_folk","Bob Dylan");
      put("queen_of_hiphop","Missy Elliott");
      put("queen_of_jazz","Ella Fitzgerald");
      put("queen_of_disco","Gloria Gaynor");
      put("king_of_youtube","Psy");
      put("king_of_rocknroll","Elvis Presley");
    }
  };
  private static List<String> questionsList = Arrays.asList(
      "king_of_rap",
      "queen_of_soul",
      "king_of_jazz",
      "queen_of_pop",
      "king_of_rnb",
      "queen_of_christmas",
      "king_of_antipop",
      "king_of_reggae",
      "king_of_folk",
      "queen_of_hiphop",
      "queen_of_jazz",
      "queen_of_disco",
      "king_of_youtube",
      "king_of_rocknroll"
  );
  private static List<String> allOptions = Arrays.asList(
      "Lee Aaron","Paula Abdul","Roy Acuff","Ivi Adamou","Adele",
      "Paulina Álvarez","Morissette Amon","A-Mei","Namie Amuro","Nancy Ajram",
      "Aphex Twin","Antonio Arcaño","Don Arden","Louis Armstrong","Sheila E.",
      "Nokie Edwards","Andrew Eldritch","Missy Elliott","Gloria Estefan","Red Foley",
      "Nina Hagen","Eddie Van Halen","Bill Haley","Rob Halford","Ayumi Hamasaki","Mehdi Hassan",
      "Nazia Hassan","Hana Hegerová","Kiyoshi Hikawa","Kohmi Hirose","Billie Holiday","John Lee Hooker",
      "Whitney Houston","Jennifer Hudson","Samuel Hui","Al Hurricane","Alicia Keys","Kendrick Lamar",
      "Adam Lambert","Nikki Lane","James Last","Avril Lavigne","Jerry Lee Lewis","Johnny Logan","Kenny Loggins",
      "Toby Love","Luis Miguel","Loretta Lynn","Vera Lynn","Francis Magalona","Miriam Makeba","Bob Marley",
      "Biz Markie","Ricky Martin","Melanie Martinez","Fernando Maurício","Kym Mazelle","Reba McEntire",
      "Lydia Mendoza","Idina Menzel","Daniela Mercury","Freddie Mercury","Liza Minnelli","Kylie Minogue",
      "Lani Misalucha","Hibari Misora","Bill Monroe","Rudy Ray Moore","Giorgio Moroder","Anita Mui",
      "Zeki Müren","Peter Murphy","Emilio Navaira","Stevie Nicks","Bert Nievera","Martin Nievera",
      "Marni Nixon","Larry Norman","Zsa Zsa Padilla","Nexhmije Pagarusha","Imelda Papin","Sandara Park",
      "Dolly Parton","Abida Parveen","Charley Patton","Les Paul","Luciano Pavarotti","Neil Peart","CeCe Peniston",
      "Peret","Carl Perkins","Maite Perroni","Katy Perry","Bernadette Peters","Iggy Pop","Pérez Prado","Elvis Presley",
      "Lisa Marie Presley","Ma Rainey","Johnnie Ray","Otis Redding","Lou Reed","Esma Redžepova","Sheryn Regis","Teddy Riley",
      "Jamie Rivera","Jenni Rivera","Jimmie Rodgers","Amália Rodrigues","RuPaul","Ahmed Rushdi","Mighty Sparrow","Jane Zhang"
  );

  //Contrived, but...works
  private static JSONObject getRandomQuestion() {
    JSONObject jsonObject = new JSONObject();
    Random random = new Random();
    String randomQuestion = questionsList.get(random.nextInt(questionsList.size()));
    //Choose the correct option + any 3 options. There might be duplicates, but doesn't matter.
    List<String> options = Arrays.asList(
        questionSolutions.get(randomQuestion),
        allOptions.get(random.nextInt(allOptions.size())),
        allOptions.get(random.nextInt(allOptions.size())),
        allOptions.get(random.nextInt(allOptions.size()))
    );

    Collections.shuffle(options);
    jsonObject.put("question", randomQuestion);
    jsonObject.put("options", options);
    return jsonObject;
  }

  public static void main(String[] args) {
    port(8888);

    get("/question", (request, response) -> {
      JSONObject jsonObject = getRandomQuestion();
      log.info("/question -> {}", jsonObject);
      response.status(200);
      response.header("Access-Control-Allow-Origin", "*");
      return jsonObject.toJSONString();
    });


    get("/ctf/solved", (request, response) -> {
      JSONObject jsonObject = new JSONObject();
      jsonObject.put("solved", "false");
      Properties props = new Properties();
      FileInputStream fi = new FileInputStream(new File("property.dat"));
      props.load(fi);
      fi.close();
      for (String key : props.stringPropertyNames()) {
        if (props.getProperty(key).contains("king_of_pop.jpg")) {
          jsonObject.put("solved", "true");
          break;
        }
      }
      response.header("Access-Control-Allow-Origin", "*");
      return jsonObject.toJSONString();
    });

    post("/answer", (request, response) -> {
      log.info("/answer -> {}", request.body());

      Question question = null;
      String message = "";
      //During normal operation, this works well. When RCE happens, exception is expected
      try {
        question = deserializeQuestion(request);
      } catch (Exception e) {
        //Add a critical error message but continue execution, since default image needs to be displayed
        //The proper payload will rewrite property.dat with king_of_default=king_of_pop.jpg here.
        message = "Oops, there was a critical error. But here, have our default image :)";
      }

      JSONObject responseJSON = new JSONObject();
      if (question != null) {
        //Return result
        Properties prop = new Properties();
        String questionID = question.getQuestion();
        try {
          FileInputStream fi = new FileInputStream(new File("property.dat"));
          prop.load(fi);
          fi.close();
          String filePath = prop.getProperty(questionID);
          if (filePath != null) {
            //Everything okey-dokey
            responseJSON.put("image", questionID);
            responseJSON.put("imageData", getImageData(filePath));
            responseJSON.put("message", isCorrectOption(question) ? "Right answer! :)" : "Wrong answer! :(");
          } else {
            //Image not found
            message = "Oops, we haven't covered the "
                + (question.getQuestion() == null || question.getQuestion().trim().isEmpty() ? "question" : question.getQuestion())
                + ", will be added in the next update.";
            responseJSON.put("image", "king_of_default");
            responseJSON.put("imageData", getImageData(prop.getProperty("king_of_default")));
            responseJSON.put("message", message);
          }
        } catch (Exception e) {
          //Something wrong with the props file
          responseJSON.put("image", questionID);
          responseJSON.put("message", "Oops, seems to be an error with the props file! " + e);
        }
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Methods", "GET,POST");
        response.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers");
        return responseJSON.toJSONString();
      } else {
        FileInputStream fi = new FileInputStream(new File("property.dat"));
        Properties prop = new Properties();
        prop.load(fi);
        fi.close();
        message = message.isEmpty() ? "Oops, there was a critical error. Null something? But here, you can have the default image" : message;
        //Return an internal error image, mention NPE
        responseJSON.put("image", "king_of_default");
        responseJSON.put("imageData", getImageData(prop.getProperty("king_of_default")));
        responseJSON.put("message", message);
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Allow-Methods", "GET,POST");
        response.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
        return responseJSON.toJSONString();
      }
    });

    options("/*", (req, res) -> {
      String accessControlRequestHeaders = req.headers("Access-Control-Request-Headers");
      if (accessControlRequestHeaders != null) {
        res.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
      }

      String accessControlRequestMethod = req.headers("Access-Control-Request-Method");
      if (accessControlRequestMethod != null) {
        res.header("Access-Control-Allow-Methods", accessControlRequestMethod);
      }
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,POST");
      res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers");
      return new JSONObject().toJSONString();
    });

  }
  private static String getImageData(String filePath) {
    String base64Content = ""; //Add some default value
    try{
      File fi = new File(filePath);
      byte[] fileContent = Files.readAllBytes(fi.toPath());
      base64Content = Base64.getEncoder().encodeToString(fileContent);

    } catch(Exception e){
      //log
    }
    return "data:image/png;base64,"+ base64Content;
  }

  private static boolean isCorrectOption(Question question) {
    String correctOption = questionSolutions.get(question.getQuestion());
    return (question.getOption().equals(correctOption));
  }

  private static Question deserializeQuestion(Request request) throws Exception {
    return deserializer.readValue(request.body(), Question.class);
  }
}
