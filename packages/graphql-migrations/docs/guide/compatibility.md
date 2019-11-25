# Database compatibility

**🙂 Contributions are welcome for SQL queries or testing!**

| Icon | Meaning |
|:--:| ----- |
| ✔️ | Supported |
| ❓ | Not tested |
| - | Not implemented |
| ❌ | Not supported |

---

| Operation     | pg | mysql | mssql | oracle | sqlite3 |
| ------------- |:--:|:-----:|:-----:|:------:|:-------:|
| Read tables   | ✔️ | ❓ | ❓ | ❓ | ❓ |
| Read table comments | ✔️ | ❓ | - | - | ❌ |
| Read columns  | ✔️ | ❓ | ❓ | ❓ | ❓ |
| Read column types  | ✔️ | ❓ | ❓ | ❓ | ❓ |
| Read column comments | ✔️ | - | - | - | ❌ |
| Read column default values  | ✔️ | ❓ | ❓ | ❓ | ❓ |
| Read foreign keys | ✔️ | - | - | - | - |
| Read primary keys | ✔️ | - | - | - | - |
| Read index | ✔️ | - | - | - | - |
| Read unique constraint | ✔️ | - | - | - | - |
| Write tables   | ✔️ | ❓ | ❓ | ❓ | ❓ |
| Write table comments | ✔️ | ❓ | ❓ | ❓ | ❌ |
| Write columns   | ✔️ | ❓ | ❓ | ❓ | ❓ |
| Write column comments | ✔️ | ❓ | ❓ | ❓ | ❌ |
| Write foreign keys | ✔️ | ❓ | ❓ | ❓ | ❓ |
| Write primary keys | ✔️ | ❓ | ❓ | ❓ | ❓ |
| Write index | ✔️ | ❓ | ❓ | ❓ | ❓ |
| Write unique constraint | ✔️ | ❓ | ❓ | ❓ | ❓ |
