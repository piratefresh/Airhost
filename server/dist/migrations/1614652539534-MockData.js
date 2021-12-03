"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockData1614652539534 = void 0;
class MockData1614652539534 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
        insert into post (title, image, text, "authorId", "createdAt") values (1, 'http://dummyimage.com/435x432.jpg/ff4444/ffffff', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.

Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', 1, '2021-01-13T17:16:55Z');
insert into post (title, image, text, "authorId", "createdAt") values (2, 'http://dummyimage.com/412x415.png/ff4444/ffffff', 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.

Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.

Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', 1, '2020-09-03T17:08:26Z');
insert into post (title, image, text, "authorId", "createdAt") values (3, 'http://dummyimage.com/493x556.jpg/cc0000/ffffff', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.', 1, '2020-07-04T01:13:23Z');
insert into post (title, image, text, "authorId", "createdAt") values (4, 'http://dummyimage.com/468x512.jpg/dddddd/000000', 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.

Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', 1, '2020-08-27T19:21:09Z');
insert into post (title, image, text, "authorId", "createdAt") values (5, 'http://dummyimage.com/471x431.bmp/ff4444/ffffff', 'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.', 1, '2020-07-25T07:01:33Z');
insert into post (title, image, text, "authorId", "createdAt") values (6, 'http://dummyimage.com/578x467.bmp/cc0000/ffffff', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.

Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', 1, '2020-10-18T05:32:55Z');
insert into post (title, image, text, "authorId", "createdAt") values (7, 'http://dummyimage.com/551x429.bmp/dddddd/000000', 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', 1, '2020-04-14T19:16:49Z');
insert into post (title, image, text, "authorId", "createdAt") values (8, 'http://dummyimage.com/588x408.png/dddddd/000000', 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.

Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.

Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', 1, '2020-02-16T10:23:27Z');
insert into post (title, image, text, "authorId", "createdAt") values (9, 'http://dummyimage.com/525x583.bmp/dddddd/000000', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.

In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', 1, '2020-06-16T10:55:32Z');
insert into post (title, image, text, "authorId", "createdAt") values (10, 'http://dummyimage.com/557x590.png/cc0000/ffffff', 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.', 1, '2020-03-28T05:55:58Z');
insert into post (title, image, text, "authorId", "createdAt") values (11, 'http://dummyimage.com/598x507.png/dddddd/000000', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 1, '2021-01-16T15:23:10Z');
insert into post (title, image, text, "authorId", "createdAt") values (12, 'http://dummyimage.com/417x544.png/ff4444/ffffff', 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', 1, '2020-02-25T17:39:12Z');
insert into post (title, image, text, "authorId", "createdAt") values (13, 'http://dummyimage.com/487x558.bmp/cc0000/ffffff', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.

Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.', 1, '2020-08-03T06:05:30Z');
insert into post (title, image, text, "authorId", "createdAt") values (14, 'http://dummyimage.com/553x448.png/5fa2dd/ffffff', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.

Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', 1, '2020-03-01T19:36:27Z');
insert into post (title, image, text, "authorId", "createdAt") values (15, 'http://dummyimage.com/561x432.bmp/ff4444/ffffff', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.

Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 1, '2021-01-12T05:30:05Z');
insert into post (title, image, text, "authorId", "createdAt") values (16, 'http://dummyimage.com/410x420.png/cc0000/ffffff', 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', 1, '2020-10-01T19:32:18Z');
insert into post (title, image, text, "authorId", "createdAt") values (17, 'http://dummyimage.com/554x559.jpg/5fa2dd/ffffff', 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.

Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.

In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', 1, '2020-10-16T04:52:37Z');
insert into post (title, image, text, "authorId", "createdAt") values (18, 'http://dummyimage.com/483x533.bmp/cc0000/ffffff', 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', 1, '2021-01-29T03:17:54Z');
insert into post (title, image, text, "authorId", "createdAt") values (19, 'http://dummyimage.com/516x426.bmp/cc0000/ffffff', 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', 1, '2021-01-06T13:41:42Z');
insert into post (title, image, text, "authorId", "createdAt") values (20, 'http://dummyimage.com/487x509.jpg/cc0000/ffffff', 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.

In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', 1, '2020-08-17T09:45:46Z');
insert into post (title, image, text, "authorId", "createdAt") values (21, 'http://dummyimage.com/595x510.jpg/cc0000/ffffff', 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.', 1, '2020-04-11T22:45:46Z');
insert into post (title, image, text, "authorId", "createdAt") values (22, 'http://dummyimage.com/500x513.jpg/dddddd/000000', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', 1, '2020-04-10T19:59:58Z');
insert into post (title, image, text, "authorId", "createdAt") values (23, 'http://dummyimage.com/582x585.png/5fa2dd/ffffff', 'Fusce consequat. Nulla nisl. Nunc nisl.

Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', 1, '2020-11-13T18:07:31Z');
insert into post (title, image, text, "authorId", "createdAt") values (24, 'http://dummyimage.com/562x442.bmp/cc0000/ffffff', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.

Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.

Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', 1, '2020-04-03T15:06:01Z');
insert into post (title, image, text, "authorId", "createdAt") values (25, 'http://dummyimage.com/450x568.png/5fa2dd/ffffff', 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.', 1, '2020-03-29T14:07:15Z');
insert into post (title, image, text, "authorId", "createdAt") values (26, 'http://dummyimage.com/515x519.bmp/5fa2dd/ffffff', 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.

Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.

Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.', 1, '2020-12-22T02:18:21Z');
insert into post (title, image, text, "authorId", "createdAt") values (27, 'http://dummyimage.com/536x462.bmp/dddddd/000000', 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.

Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', 1, '2020-12-11T12:42:48Z');
insert into post (title, image, text, "authorId", "createdAt") values (28, 'http://dummyimage.com/466x480.png/ff4444/ffffff', 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.

Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.

Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', 1, '2020-11-06T13:54:04Z');
insert into post (title, image, text, "authorId", "createdAt") values (29, 'http://dummyimage.com/585x433.jpg/5fa2dd/ffffff', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.

Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', 1, '2020-10-15T06:59:50Z');
insert into post (title, image, text, "authorId", "createdAt") values (30, 'http://dummyimage.com/465x478.jpg/5fa2dd/ffffff', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.

Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.

Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', 1, '2020-11-18T22:01:46Z');
insert into post (title, image, text, "authorId", "createdAt") values (31, 'http://dummyimage.com/546x497.jpg/cc0000/ffffff', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 1, '2020-12-17T17:22:29Z');
insert into post (title, image, text, "authorId", "createdAt") values (32, 'http://dummyimage.com/490x406.jpg/dddddd/000000', 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.

Sed ante. Vivamus tortor. Duis mattis egestas metus.

Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', 1, '2020-11-11T01:41:10Z');
insert into post (title, image, text, "authorId", "createdAt") values (33, 'http://dummyimage.com/488x448.jpg/cc0000/ffffff', 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.

Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', 1, '2020-09-15T20:52:44Z');
insert into post (title, image, text, "authorId", "createdAt") values (34, 'http://dummyimage.com/461x471.png/cc0000/ffffff', 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.

Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.

Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', 1, '2020-03-13T21:42:35Z');
insert into post (title, image, text, "authorId", "createdAt") values (35, 'http://dummyimage.com/592x478.bmp/cc0000/ffffff', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.

Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 1, '2020-04-11T05:28:27Z');
insert into post (title, image, text, "authorId", "createdAt") values (36, 'http://dummyimage.com/443x466.bmp/cc0000/ffffff', 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.

Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 1, '2020-12-16T10:03:02Z');
insert into post (title, image, text, "authorId", "createdAt") values (37, 'http://dummyimage.com/567x565.bmp/dddddd/000000', 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.

Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.

Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.', 1, '2020-03-22T12:21:25Z');
insert into post (title, image, text, "authorId", "createdAt") values (38, 'http://dummyimage.com/516x529.bmp/cc0000/ffffff', 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.

Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', 1, '2020-11-19T10:07:25Z');
insert into post (title, image, text, "authorId", "createdAt") values (39, 'http://dummyimage.com/558x412.jpg/cc0000/ffffff', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.

Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 1, '2020-03-08T15:39:32Z');
insert into post (title, image, text, "authorId", "createdAt") values (40, 'http://dummyimage.com/514x581.png/ff4444/ffffff', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.

Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 1, '2020-06-06T23:23:34Z');
`);
        });
    }
    down(_) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.MockData1614652539534 = MockData1614652539534;
//# sourceMappingURL=1614652539534-MockData.js.map