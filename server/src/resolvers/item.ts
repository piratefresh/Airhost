import { Item } from "../entities/Item";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import {
  Resolver,
  Query,
  Arg,
  Ctx,
  Mutation,
  UseMiddleware,
  Field,
  InputType,
} from "type-graphql";

@InputType()
class ItemInput {
  @Field()
  name: string;
  @Field()
  rarityText: string;
  @Field()
  rarity: number;
  @Field()
  source: string;
  @Field()
  description: string;
  @Field()
  price: number;
  @Field()
  type: string;
  @Field()
  encumbrance: number;
  @Field()
  image: string;
  @Field()
  damage: string;
  @Field()
  crit: string;
  @Field()
  range: string;
  @Field()
  hp: string;
}

@Resolver(Item)
export class ItemResolver {
  @Mutation(() => Item)
  @UseMiddleware(isAuth)
  async createItem(
    @Arg("input") input: ItemInput,
    @Ctx() { req }: MyContext
  ): Promise<Item> {
    return Item.create({
      ...input,
    }).save();
  }

  @Query(() => [Item])
  async getItems(@Ctx() { req }: MyContext): Promise<Item[]> {
    const items = await Item.find({});
    return items;
  }
}
