const headerInfo = token => ({
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + token,
  'Notion-Version': '2021-08-16'
})

// Create a diary page for the given date
const createPage = (dbId, token, meetingDate) => {
  const endPoint = `https://api.notion.com/v1/pages`

  const content_data = {
    parent: {
      database_id: dbId,
    },
    properties: {
      Name: {
        title: [{
          text: {
            content: `[定例]${meetingDate}`
          }
        }]
      },
      Tag: {
        multi_select:[
          {
            "name": "mtg"
          }
        ]
      }
    },
    "children": [
      {
        "object": "block",
        "type": "heading_1",
        "heading_1": {
          "text": [
            {
              "type": "text",
              "text": {
                "content": "議題"
                }
            }
          ]
        }
      },
      {
        "type": "bulleted_list_item",
        //...other keys excluded
        "bulleted_list_item": {
          "text": [{
            "type": "text",
            "text": {
              "content": "",
              "link": null
            }
          }],
        }
      },
      {
        "type": "bulleted_list_item",
        "bulleted_list_item": {
          "text": [{
            "type": "text",
            "text": {
              "content": "",
              "link": null
            }
          }],
        }
      },
      {
        "object": "block",
        "type": "heading_1",
        "heading_1": {
          "text": [
            {
              "type": "text",
              "text": {
                "content": "決まったこと"
                }
            }
          ]
        }
      },
      {
        "type": "bulleted_list_item",
        "bulleted_list_item": {
          "text": [{
            "type": "text",
            "text": {
              "content": "",
              "link": null
            }
          }],
        }
      },
      {
        "object": "block",
        "type": "heading_1",
        "heading_1": {
          "text": [
            {
              "type": "text",
              "text": {
                "content": "ToDo"
                }
            }
          ]
        }
      },
      {
        "type": "to_do",
        "to_do": {
          "text": [{
            "type": "text",
            "text": {
              "content": "",
              "link": null
            }
          }],
          "checked": false,
        }
      },
      {
        "type": "to_do",
        "to_do": {
          "text": [{
            "type": "text",
            "text": {
              "content": "",
              "link": null
            }
          }],
          "checked": false,
        }
      },
      {
        "type": "to_do",
        "to_do": {
          "text": [{
            "type": "text",
            "text": {
              "content": "",
              "link": null
            }
          }],
          "checked": false,
        }
      }
    ]
  }
  const options = {
    method: 'post',
    headers: headerInfo(token),
    payload: JSON.stringify(content_data)
  }
  const resp = UrlFetchApp.fetch(endPoint, options)
  return JSON.parse(resp.getContentText())
}


// 定時実行する関数
const createTodayMeetingPage = () => {
  const dbid = "{dbのID}"
  const token = "{notionのトークン}"
  const now = new Date()
  const meetingDate = now.toLocaleDateString("ja-JP", { timeZone: "Asia/Tokyo" })

  const result = createPage(dbid, token, meetingDate)
  console.log(result)
}